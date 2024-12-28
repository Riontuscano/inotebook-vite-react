import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongooseURI = "mongodb://localhost:27017/inotebook";

const connectDB = async () => {
  try {
    await mongoose.connect(mongooseURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

export default connectDB;
