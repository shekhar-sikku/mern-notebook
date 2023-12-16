/* eslint-disable no-undef */
import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to database successfully! Host : ${connectionInstance.connection.host}\n`)
    } catch (error) {
        console.error('\nDatabase connection failed! :', error.message, '\n')
        process.exit(1)
    }
};

export default connectMongo;