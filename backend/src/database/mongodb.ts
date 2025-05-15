import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../../src/config/env';

const connectToDatabase = async () => {
    if (!DB_URI) {
      throw new Error('DB_URI is not defined');
    }
  
    try {
      await mongoose.connect(DB_URI);
  
      console.log(`Connected to database in ${NODE_ENV} mode`);
    } catch (error) {
      console.error('Error connecting to database: ', error);
  
      process.exit(1);
    }
  }

export default connectToDatabase;