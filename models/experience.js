const mongoose = require('mongoose');
const config = require('../config/database');

const Schema = mongoose.Schema

const ExperienceSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    experienceinmonths: {
        type: Number,
    },
    employer: {
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
},
{
    timeestamps: true
});

const Experience = module.exports = mongoose.model('Experience', ExperienceSchema);

module.exports.addExperience = (experience, lead) => {
    return new Promise((resolve, reject) => {
        experience.save((err, data) => {
            if (err) reject(err);

            lead.experience.push(data);
            lead.save((err, lead) => {
                if (err) reject(err);
                if (lead) {
                    resolve(data);
                }
            })
        });
    });
}

module.exports.getExperience = (id, callback) => {
    Experience.findById(id, callback);
};

module.exports.updateExperience = (id, data, callback) => {
    Experience.findByIdAndUpdate(id, data, {new: true})
        .exec(callback);
};