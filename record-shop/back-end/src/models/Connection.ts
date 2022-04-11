import mongoose from 'mongoose';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || 'mongodb://localhost:27017/TrybeStore?authSource=admin',
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
