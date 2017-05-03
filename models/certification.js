const mongoose = require('mongoose');
const config = require('../config/database');

const CertificationSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    institution: {
        type: String
    },
    certification: {
        type: String
    }
});

const Certification = module.exports.Certification = mongoose.model('Certification', CertificationSchema);