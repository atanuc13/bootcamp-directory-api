const mongoose = require("mongoose");

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.DB_CONNECTION2, {
        useNewUrlParser: true
    });

    console.log('db connected');
};

module.exports = connectDB;