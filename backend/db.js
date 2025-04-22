import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)    
        console.log("MongoDB Successfully Connected")
    }
    catch (error)
    {
        console.log("Error connecting the DB")
    }
}
export default connectDB;