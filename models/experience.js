const mongoose = require('mongoose');
const config = require('../config/database');

const ExperienceSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    experienceinmonths: {
        type: Number,
    },
    Employer: {
        type: String
    },
    jobTitle: {
        type: String,
    },
    from: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        }
    },
    to: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        }
    }
});

const Experience = module.exports.Experience = mongoose.model('Experience', ExperienceSchema);