const express = require('express');
const router = express.Router();
const LanguageTest = require('../models/languagetest');
const passport = require('passport');
const Lead = require('../models/lead');


let _addLeadtoRequest = (req, res, next) => {
    Lead.findById(req.query.id, (err, leadinfo) => {
        if (err) {
            return res.status(500).json({
                title: "Error Saving",
                obj: {
                    message: "Fetch lead failed"
                }
            });
        }
        else {
            req.lead = leadinfo;
            next();
        }
    });
};

router.post('/add', passport.authenticate('jwt', {session: false}), _addLeadtoRequest, (req, res, next) => {
    let lead = req.lead;
    let languagetest = new LanguageTest({
        leadProfile: lead,
        testname: req.body.testname,
        scores: req.body.scores
    });

    LanguageTest.addLanguageTest(languagetest, lead)
        .then((languagetestinfo) => {
            res.status(200).json({
                title: 'Saved Successfully',
                obj: languagetestinfo
            });
        }).catch((err) => {
            res.status(500).json({
                title: 'Save Unsuccessful',
                obj: err
            });
        });
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //let lead = req.lead;
    
    LanguageTest.getLanguageTest(req.params.id, (err, laninfo) => {
        if (err) {
            return res.status(200).json({
                title: 'Delete unsuccessful',
                obj: err
            });
        }
        let leadid = laninfo.leadProfile;
        Lead.getLeadById(leadid, (err, lead) => {
            lead.languagetest.pull(laninfo);
            lead.save((err, data) => {
                if (err) {
                    return res.status(500).json({
                        title: 'Save unsuccessful',
                        obj: err
                    });
                }
                else {
                    laninfo.remove((err, result) => {
                        if (err) {
                            return res.status(500).json({
                                title: 'Delete unsuccessful',
                                obj: err
                            });
                        }
                        return res.status(200).json({
                            title: 'Delete successful',
                            obj: result
                        });
                    });
                }
            });
        });
    });
});


router.patch('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let id = req.params.id;
    let laninfo = req.body;
    laninfo.lastmodifiedBy = req.user;
    LanguageTest.updateLanguageTest(id, laninfo, (err, data) => {
        if (err) {
            return res.status(500).json({
                title: 'Update Unsuccessful',
                obj: err
            });
        }
        else {
            return res.status(201).json({
                title: 'Updated Successfully',
                obj: data
            });
        }
    });
});

module.exports = router;