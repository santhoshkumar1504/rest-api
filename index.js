const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

// environment variable configuration
dotenv.config();

const {port,mongodb_url}=require('./config/Connection');

const { authRouter, categoryRouter, fileRouter } = require('./routes');
const { errorHandler } = require('./middlewares');
const { notFound } = require('./controllers');

const app=express();

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());


// routes section
app.use('/api/v1/auth',authRouter);

app.use('/api/v1/category',categoryRouter);

app.use('/api/v1/file',fileRouter);

app.listen(port,()=>{
    console.log("Server is running");
    mongoose.connect(mongodb_url).then(()=>{console.log("Database Connected")}).catch((error)=>{console.log(error.message)})
});

// error Handler middleware
app.use(errorHandler);


// res.code=400
// throw new Error("test error")