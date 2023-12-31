import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config();
const mongoUri=process.env.MONGO_URI;

async function dbmain(){
    await mongoose.connect(mongoUri)
}
export async function dbdisconnect(){
    await mongoose.disconnect()
}
export default dbmain;