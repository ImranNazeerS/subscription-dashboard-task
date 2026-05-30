import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plan from '../models/Plan.js';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Need to load env if running this script directly
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const samplePlans = [
  {
    name: 'Basic',
    price: 9,
    features: ['1 User', '5GB Storage', 'Basic Support'],
    duration: 30, // 30 days
  },
  {
    name: 'Pro',
    price: 29,
    features: ['5 Users', '50GB Storage', 'Priority Support', 'Advanced Analytics'],
    duration: 30,
  },
  {
    name: 'Enterprise',
    price: 99,
    features: ['Unlimited Users', '500GB Storage', '24/7 Dedicated Support', 'Custom Integrations'],
    duration: 30,
  },
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing plans
    await Plan.deleteMany();
    console.log('Existing plans removed');

    // Insert new plans
    await Plan.insertMany(samplePlans);
    console.log('Sample plans seeded successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedPlans();
