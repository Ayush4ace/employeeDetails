import mongoose from "mongoose";

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected succfully")
    } catch (error) {
        console.log(error);
        throw new error;
    }
}

export default connectDB;