import connectDB from "./db/index.js";
import dotenv from 'dotenv';

dotenv.config({
    path : './env'
})

connectDB()
.then(()=>{
    app.on((error)=>{
        console.log("Express unable to connect to DB");
    })
    app.listen(process.env.PORT || 2000,()=>{
        console.log(`Server is running at ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDb connection Failed");
    
})


/*
import express from 'express';
const app =express();

(async()=>{
    try {
        mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("Error: ",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error : ",error);
        throw error;
    }
})()*/