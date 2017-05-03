const mongoose = require('mongoose');
const config = require('../config/database');

const EmailSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    to: {
        type: String
    },
    subject: {
        type: String
    },
    body: {
        type: String
    }
});

module.exports.Email = mongoose.model('Email', EmailSchema)