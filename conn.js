const mongoose = require("mongoose")
const DB = process.env.MONGOURI

mongoose.connect(DB)
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo',err)
})