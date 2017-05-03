const express = require('express');
const router = express.Router();
const Education = require('../models/education');
const passport = require('passport');
const Lead = require('../models/lead');


// All the info below can be both accessed directly by a user,
// There we will get all the details and send it out in one go.
// Probably 3 or more different objects.

/* Description:
 *  The userid has to be passed as a query params here.
 * So that the apis are not confusing.
 * 
 * 
 */

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

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //let lead = req.lead;
    
    Education.getEducation(req.params.id, (err, edinfo) => {
        if (err) {
            return res.status(200).json({
                title: 'Delete unsuccessful',
                obj: err
            });
        }
        let leadid = edinfo.leadProfile;
        Lead.getLeadById(leadid, (err, lead) => {
            lead.education.pull(edinfo);
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
    Education.updateEducation(id, edinfo, (err, data) => {
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
router.post('/add', passport.authenticate('jwt', {session: false}), _addLeadtoRequest ,(req, res, next) => {
    let lead = req.lead;

    let education = new Education({
            leadProfile: lead,
            boardorUniversity: req.body.boardorUniversity,
            collegeorInstitute: req.body.collegeorInstitute,
            level: req.body.level,
            certificate: req.body.certificate,
            city: req.body.city,
            mediumofInstruction: req.body.mediumofInstruction,
            from: req.body.from,
            to: req.body.to,
            percentageOrcgpa: req.body.percentageOrcgpa,
            arrear: req.body.arrear,
            /* Subjects are usually of the form,
                * subject: [{name: 'English', mark: '100'}, {name: 'Tamil', mark: 50}]
                * 
                * I will add constraints later. currently the model is [{}]
                */
            subject: req.body.subject,
            createdBy: req.user 
        });



    Education.addEducation(education, lead)
        .then((educationinfo) => {
            res.status(200).json({
                title: 'Saved Successfully',
                obj: educationinfo
            });
        }).catch((err) => {
            res.status(500).json({
                title: 'Save Unsuccessful',
                obj: {
                    message: err
                }
            });
        });
});

module.exports = router;