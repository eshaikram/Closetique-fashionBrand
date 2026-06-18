import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

(async () => {
  console.log("MONGODB_URI present:", !!process.env.MONGODB_URI);
  console.log("JWT_SECRET present:", !!process.env.JWT_SECRET);

  try {
    console.log("Connecting to MongoDB…");
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "clothing-store" });
    console.log("✅ Connected");

    const admin = await User.findOne({ email: "admin@gmail.com" });
    if (!admin) {
      console.log("❌ Admin user not found. Run: node src/scripts/seedAdmin.js");
      process.exit(1);
    }
    console.log("✅ Admin found:", {
      _id: admin._id.toString(),
      email: admin.email,
      isAdmin: admin.isAdmin,
      passwordLength: admin.password?.length ?? 0,
    });

    const ok = await admin.matchPassword("11223344");
    console.log("✅ Password matches '11223344':", ok);

    process.exit(0);
  } catch (err) {
    console.error("❌ FAILED:", err.message);
    console.error(err);
    process.exit(1);
  }
})();
