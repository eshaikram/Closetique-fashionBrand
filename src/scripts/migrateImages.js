import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import dbConnect from "../lib/db.js"; // Fixed: Use relative path instead of @/lib/db.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Setup env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env.local");
console.log(`Loading .env from: ${envPath}`);
dotenv.config({ path: envPath });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate environment variables
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not defined in .env.local");
  process.exit(1);
}
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Error: Cloudinary credentials are missing in .env.local");
  process.exit(1);
}

async function migrateImagesToCloudinary() {
  try {
    // Connect to MongoDB
    await dbConnect();
    console.log("Connected to MongoDB");

    // Fetch all products
    const products = await Product.find();
    console.log(`Found ${products.length} products to process`);

    for (const product of products) {
      const imageUrls = [];
      for (const [index, base64] of product.images.entries()) {
        // Skip invalid or non-Base64 images
        if (!base64 || !base64.startsWith("data:image")) {
          console.log(`Skipping invalid image for product ${product._id} at index ${index}`);
          continue;
        }

        // Extract Base64 data
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Save temporary file
        const tempFilePath = `./temp-${product._id}-${index}.png`;
        fs.writeFileSync(tempFilePath, buffer);

        // Create Cloudinary public_id
        const publicId = `${product.gender}/${product.category}/${product.brand}/${product._id}/${index}`;

        // Upload to Cloudinary as WebP
        try {
          const result = await cloudinary.uploader.upload(tempFilePath, {
            public_id: publicId,
            resource_type: "image",
            format: "webp",
          });

          imageUrls.push(result.secure_url);
          console.log(`Uploaded image for product ${product._id} at index ${index}: ${result.secure_url}`);
        } catch (uploadError) {
          console.error(`Failed to upload image for product ${product._id} at index ${index}:`, uploadError);
        }

        // Clean up temporary file
        fs.unlinkSync(tempFilePath);
      }

      // Update product with Cloudinary URLs
      if (imageUrls.length > 0) {
        await Product.updateOne({ _id: product._id }, { images: imageUrls });
        console.log(`Updated product ${product._id} with ${imageUrls.length} Cloudinary URLs`);
      } else {
        console.log(`No valid images to update for product ${product._id}`);
      }
    }

    console.log("Migration complete");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  }
}

migrateImagesToCloudinary();