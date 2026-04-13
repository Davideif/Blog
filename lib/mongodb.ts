import mongoose from 'mongoose';


let isConnected = false;
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not defined");

const connectDB: () => Promise<void> = async () => {
    if (isConnected) {
        console.log('DB is already connected');
        return;
    }

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log('MongoDB is connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
