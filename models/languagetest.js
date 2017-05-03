const mongoose = require('mongoose');
const config = require('../config/database');

const LanguagetestSchema = mongoose.Schema({
    leadProfile: {
        type: Schema.Types.ObjectId,
        ref: 'Lead',
    },
    testname: {
        type: String,
    },
    scores: [{
    }]
});

module.exports.Languagetest = mongoose.model('Languagetest', LanguagetestSchema);
