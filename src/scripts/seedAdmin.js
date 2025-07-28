import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js'; // note the .js extension even if file is .mjs

// Setup env path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      return process.exit(0);
    }

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: '11223344', // bcrypt will auto-hash due to pre-save hook
      isAdmin: true,
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
