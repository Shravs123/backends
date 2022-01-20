const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config({path: './config.env' });
require('./db/conn');
app.use(express.json())
app.use(require('./routes/auth'))

const User = require('./model/userSchema');
const PORT = process.env.PORT




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})