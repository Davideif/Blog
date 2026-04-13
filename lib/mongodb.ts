import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is not defined');

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

// Registering all models here guarantees they're in Mongoose's
// registry whenever connectDB is called, regardless of import order
import '@/models/User';
import '@/models/Post';

export default connectDB;