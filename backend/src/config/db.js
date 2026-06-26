import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.Mongo_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Connection error: ${error.message}`);
    };
}

export default connectDB;