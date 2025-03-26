const mongoose = require('mongoose');

const connectDB=async()=>{
    await mongoose.connect(
        'mongodb+srv://kavyagorjila:15072004@cluster0.zppl3ye.mongodb.net/'
    );
};

module.exports = connectDB;

