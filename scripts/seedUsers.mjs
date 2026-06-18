// Seeds a known admin + customer account so you can log in.
// Run:  node scripts/seedUsers.mjs
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI missing in .env.local");
  process.exit(1);
}

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    address: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

const accounts = [
  {
    name: "Store Admin",
    email: "admin@closetique.com",
    password: "Admin@123",
    isAdmin: true,
  },
  {
    name: "Demo Customer",
    email: "user@closetique.com",
    password: "User@123",
    isAdmin: false,
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI, { dbName: "clothing-store" });
  for (const acc of accounts) {
    const hashed = await bcrypt.hash(acc.password, 10);
    await User.findOneAndUpdate(
      { email: acc.email },
      { ...acc, password: hashed },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`✓ ${acc.isAdmin ? "ADMIN" : "USER "}  ${acc.email}  /  ${acc.password}`);
  }
  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
