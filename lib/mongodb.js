import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('DB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB is connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
