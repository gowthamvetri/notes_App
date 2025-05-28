import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_DB_URI){
    throw new Error("Please provide mongodb URI ");
}

async function connectdb(){
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("DB connected Successfully");
    } catch (error) {
        console.log("Error in connecting db" + error);
        exit(1);
    }
}

export default connectdb;