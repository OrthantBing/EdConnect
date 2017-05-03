const express = require('express');
const router = express.Router();
const Experience = require('../models/experience');
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
    let experience = new Experience({
        leadProfile: lead,
        experienceinmonths: req.body.experienceinmonths,
        employer: req.body.employer,
        jobTitle: req.body.jobTitle,
        from: req.body.from,
        to: req.body.to
    });

    Experience.addExperience(experience, lead)
        .then((experienceinfo) => {
            res.status(200).json({
                title: 'Saved Successfully',
                obj: experienceinfo
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
    
    Experience.getExperience(req.params.id, (err, edinfo) => {
        if (err) {
            return res.status(200).json({
                title: 'Delete unsuccessful',
                obj: err
            });
        }
        let leadid = edinfo.leadProfile;
        Lead.getLeadById(leadid, (err, lead) => {
            lead.experience.pull(edinfo);
            lead.save((err, data) => {
                if (err) {
                    return res.status(500).json({
                        title: 'Save unsuccessful',
                        obj: err
                    });
                }
                else {
                    edinfo.remove((err, result) => {
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
    let edinfo = req.body;
    edinfo.lastmodifiedBy = req.user;
    Experience.updateExperience(id, edinfo, (err, data) => {
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