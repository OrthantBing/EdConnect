const mongoose = require('mongoose');
const config = require('../config/database');

const Schema = mongoose.Schema

const LeadSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fatherName: {
        type: String
    },
    spouseName: {
        type: String,
    },
    dateOfBirth: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        },
        required: [true, 'Valid date of birth is required']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true
    },
    phone: [{
        type: Number,
        required: true
    }],
    address: {
        type: String,

    },
    photo: {
        type: String,
    },
    country: {
        type: String,
        default: 'India'
    },
    passportavailableyn: {
        type: String,
        enum: ['Y','N'],
        default: 'N'
    },

    passportnumber: {
        type: String
    },
    passportissueddate: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        },
    },

    passportexpirydate: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date'
        }
    },

    visarejected: {
        type: String,
        enum: ['Y', 'N']
    },

    visarejectednotes: {
        type: String
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    lastmodifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: [
            'Alumnus',
            'Applicant',
            'Docs Received',
            'Exp - Applicant',
            'Exp - Docs Received',
            'Invalid',
            'NI',
            'Pending',
            'Prospect',
            'RNR',
            'Suspect'
        ]
    },
    assignedto: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    education: [{
        type: Schema.Types.ObjectId,
        ref: 'Education'
    }],

    experience: [{
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    certification: [{
        type: Schema.Types.ObjectId,
        ref: 'Certification'
    }],

    languagetest: [{
        type: Schema.Types.ObjectId,
        ref: 'Languagetest'
    }]

},
// They give the timestamps info for free.
{
    timestamps: true
});

const Lead = module.exports = mongoose.model('Lead', LeadSchema);

module.exports.addLead = (lead, callback) => {
    lead.save(callback);
};

module.exports.getLeadById = (id, callback) => {
    Lead.findById(id, callback);
}

module.exports.getLeadByEmail = (email, callback) => {
    Lead.find({email: email}).exec(callback);
}

module.exports.UpdateLead = (id, data, callback) => {
    Lead.findByIdAndUpdate(id, data, { new: true })
        .exec(callback);
}

module.exports.getLeadByIdPromise = (id) => {
    return new Promise((resolve, reject) => {
        Lead.findById(id, (err, data) => {
            //console.log(data);  
            if (err) reject(err);
            resolve(data);
        });
    });
}
