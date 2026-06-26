import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.Mongo_URI || process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Missing Mongo_URI (or MONGODB_URI) in environment variables')
  }

  try {
    const conn = await mongoose.connect(uri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    throw error
  }
}

export default connectDB
