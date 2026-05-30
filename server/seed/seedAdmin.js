import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import User from '../models/User.js';

dotenv.config();

// Fix for Node v20+ SRV resolution issues with mongodb+srv
dns.setServers(['8.8.8.8', '8.8.4.4']);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding Admin...');

    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin@1234';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const adminUser = new User({
      name: 'Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
