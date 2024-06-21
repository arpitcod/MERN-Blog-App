const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//config dot env
dotenv.config()

// routes
const userRoutes = require('./Routes/userRoutes')
const blogRoutes = require('./Routes/blogRoutes')
//mongo db connection
connectDB();

//express
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))


//routes
app.use('/api/user',userRoutes)
app.use('/api/blog',blogRoutes)
//port
const PORT = process.env.PORT || 2914;

// server 
app.listen(PORT,()=>{

    console.log("your server running on port 2914 successfully")
})