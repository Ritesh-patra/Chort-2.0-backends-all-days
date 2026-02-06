const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGOURI)
    .then(() => {
        console.log('MongoDB connected');
    })
}

module.exports = connectDB;