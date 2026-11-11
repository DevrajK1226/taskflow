import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env.js';

// Workaround: some networks can't resolve Atlas SRV records, so use public DNS
dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDB() {
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected');
}