const mongoose = require('mongoose');
const config = require('../config/database');


//This will be filled during follow up 
// based on the next followup interaction.

// And this will also be filled directly by the use based on the
// todo info for himself.

const TodoSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    task: {
        type: String,
    },
    notes: {
        type: String,
    },
    duedate: {
        type: String,
        validation: {
            validator: function(x){
                return /\d{2}-\d{2}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid date' 
        }
    },
    done: {
        type: String,
        enum: ['Y','N']
    }

});

module.exports.Todo = mongoose.model('Todo', TodoSchema);