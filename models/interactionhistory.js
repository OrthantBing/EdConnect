const mongoose = require('mongoose');
const config = require('../config/database');

const InteractionhistorySchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    currentinteractiontype: {
        type: String,
    },
    outcome: {
        type: String,
    },
    discussionnotes: {
        type: String,
    },
    followupinteractionyn: {
        type: String,
        enum: ['Y','N']
    },
    followupinteractiontype: {
        type: String,
    },
    followupinteractiondate: {
        type: String,
        validation: {
            validator: function(x){
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date' 
        }
    },
    assignto: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports.Interactionhistory = mongoose.model('Interactionhistory', InteractionhistorySchema);
