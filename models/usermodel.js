const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    designation: String,
    username: String,
    email: String,
    password: String,
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);