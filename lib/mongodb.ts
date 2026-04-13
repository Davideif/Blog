import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState >= 1) {
        console.log('DB is already connected');
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');

    try {
        await mongoose.connect(uri);
        
        await import('@/models/User');
        await import('@/models/Post');
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; 
    }
};

export default connectDB;