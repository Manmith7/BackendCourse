import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app =express();

app.use(cors({
    origin : process.env.COR_ORIGIN,
    credentials : true
}))

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended : true,limit: "16kb"}))

app.use(express.static('public'))
app.use(cookieParser());

//import routes
import userRouter from './routes/user.router.js'

// routes declaration
app.use('/api/v1/users',userRouter);

// https:://localhost:8000/api/v1/users/register
export  {app};