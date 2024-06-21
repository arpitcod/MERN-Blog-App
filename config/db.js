const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
         
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`your mongoDB ${mongoose.connection.host} successfully connected`)

    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB