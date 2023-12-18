const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
    },
    otp: {
        type: String,
        required: false
    },
    credits: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
    toJSON: {getters: true},
});

module.exports = mongoose.model('User', userSchema, 'users');