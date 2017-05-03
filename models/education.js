const mongoose = require('mongoose');
const config = require('../config/database');

const Schema = mongoose.Schema

const EducationSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    boardorUniversity: {
        type: String,
        required: true,    
    },
    collegeorInstitute: {
        type: String,
        required: true,
    },

    //10,12
    level: {
        type: String,

    },

    //ME MSc
    certificate: {
        type: String,

    },
    city: {
        type: String
    },
    mediumofInstruction: {
        type: String,
    },
    from: {
        type: String,
        validate: {
            validator: function(v){
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        }
    },
    to: {
        type: String,
        validate: {
            validator: function(v){
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        }
    },
    percentageOrcgpa: {
        type: String,
    },
    arrear: {
        type: Number,
    },
    subject: [{}],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastmodifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},
{
    timeestamps: true
});

const Education = module.exports = mongoose.model('Education', EducationSchema);

module.exports.getEducation = (id, callback) => {
    Education.findById(id, callback);
};

module.exports.updateEducation = (id, data, callback) => {
    Education.findByIdAndUpdate(id, data, {new: true})
        .exec(callback);
};
module.exports.addEducation = (education, lead) => {
    return new Promise((resolve, reject) => {
        // Save the education info and get the object
        education.save((err, data) => {

            if (err) reject(err);
            // push the object to the lead
            // Will have to check if there is a better way to do it,
            // $push or something.
            lead.education.push(data);

            // Now save it and in the callback return the education data since
            // That is the thing we are saving.
            lead.save((err, lead) => {
                if (err) reject(err);
                if (lead) {
                    resolve(data);
                }
            }); 
        });
    });
};