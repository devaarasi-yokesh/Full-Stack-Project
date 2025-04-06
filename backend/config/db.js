// used to make a connection with mongoDB database using connection string

import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); // process code 1 means error, 0 means success.
    }
}