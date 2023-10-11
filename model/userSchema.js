const mongoose = require('mongoose')

// Schema for user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const users = mongoose.model("users", userSchema)
module.exports = users
