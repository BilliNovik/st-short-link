require('dotenv').config()
const mongoose = require('mongoose');
const LINK = process.env.DB;

const connectDB = () => {
    return mongoose.connect(LINK)
}

module.exports = connectDB;