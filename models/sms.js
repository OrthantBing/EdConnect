const mongoose = require('mongoose');
const config = require('../config/database');

const Sms = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    message: {
        type: String,
    }
});

module.exports.Sms = mongoose.model('Sms', SmsSchema);