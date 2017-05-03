const mongoose = require('mongoose');
const config = require('../config/database');

const Schema = mongoose.Schema;

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

const LanguageTest = module.exports = mongoose.model('Languagetest', LanguagetestSchema);

module.exports.addELanguageTest = (languagetest, lead) => {
    return new Promise((resolve, reject) => {
        languagetest.save((err, data) => {
            if (err) reject(err);

            lead.languagetest.push(data);
            lead.save((err, lead) => {
                if (err) reject(err);
                if (lead) {
                    resolve(data);
                }
            })
        });
    });
}

module.exports.getLanguageTest = (id, callback) => {
    LanguageTest.findById(id, callback);
};

module.exports.updateLanguageTest = (id, data, callback) => {
    LanguageTest.findByIdAndUpdate(id, data, {new: true})
        .exec(callback);
};