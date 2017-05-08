const express = require('express');
const router = express.Router();
const Lead = require('../models/lead');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


router.post('/validateemail', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Lead.findOne({ email: req.body.email}, (err, leademail) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else {
            if (leademail) {
                return res.status(200).json({
                    asyncInvalid: true
                });
            } else {
                return res.status(200).json({
                });
            }
        }
    });
});

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Lead.getLeadById(req.params.id, (err, lead) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else {
            return res.status(200).json({
                message: 'Lead Info',
                obj: lead
            });
        }
    });
});

/* Description:
 *  To update an entry, it has to be accessed only,
 *  by a logged in user who has authentication to do so.
 *  So adding passport middleware to the route 
 *  is appropriate.
 */

router.patch('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let data = req.body;
    // Setting lastmodified to the one who requested for the patch.
    data.lastmodifiedBy = req.user;
    Lead.UpdateLead(req.params.id, data, (err, lead) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else {
            return res.status(200).json({
                message: 'Lead Saved',
                obj: lead
            }); 
        }
    });


});

/* Description: 
 *  A post can be added in two ways.
 *  1) The post is created by our engineer. Which means,
 *      he/she has login details. We can use the token to
 *      find out the userid and save them.
 * 
 *  2) The form can be filled in by a normal user, 
 *      using the website, in which case doesnt have an,
 *      authorization token.
 * 
 *  This route will have to serve both.
 * 
 */
router.post('/add' ,(req, res, next) => {console.log(req.headers); next() }, passport.authenticate('jwt', {session: false}), (req, res, next) => {

    console.log(req.body);
    console.log(req.user);

    let lead = new Lead({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        fatherName: req.body.fatherName,
        spouseName: req.body.spouseName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        photo: req.body.photo,
        country: req.body.country,
        passportavailableyn: req.body.passsportavailableyn,
        passportnumber: req.body.passportnumber,
        passportissueddate: req.body.passportissueddate,
        passportexpirydate: req.body.passportexpirydate,
        visarejected: req.body.visarejected,
        createdBy: req.user,
        status: "Applicant",
        assignedto: req.user, // Currently assigned to the user who creted the lead
                              // if just userid is sent from the frontend we will have to get
                              // user id and then save it.
                              // currently user id getting is processed by passport.
    });



    Lead.addLead(lead, (err, lead) => {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else {
            return res.status(200).json({
                message: 'Lead Saved',
                obj: lead
            }); 
        }
    });

});




router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if (!req.query.email){
        return res.status(500).json({
            title: 'Invalid Request',
            error: {
                message: "Invalid query params"
            }
        });
    }
    else {
        Lead.getLeadByEmail(req.query.email, (err, lead) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            else {
                return res.status(200).json({
                    message: 'Lead Info',
                    obj: lead
                });
            }
        });
    }
});


module.exports = router;