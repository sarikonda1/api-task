const mongoose = require('mongoose');
module.exports = mongoose.model('Users', new mongoose.Schema({ 
    firstName: { type: String, required: true, index: { unique: true }},
    lastName: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true,  index: { unique: true } },
    primaryMobileNumber: { type: String},
    alterNateMobileNumber: { type: String},
}, { timestamps: true }));