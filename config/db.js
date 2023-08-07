const mongoose = require("mongoose");

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.DB_CONNECTION1, {
        useNewUrlParser: true
    });

    console.log('db connected');
};

module.exports = connectDB;