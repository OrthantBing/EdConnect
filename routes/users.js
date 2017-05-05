const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


/* GET users listing. */

router.post('/register', (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  console.log(req.body.email);

  User.addUser(user, (err, user) => {
    if(err){
      res.json({
        success: false, 
        msg: 'Failed to register user'
      });
    }
    else {
      res.json({
        success: true,
        msg: 'User registered successfully'
      })
    }
  });

  //res.send('REGISTER')
});

router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!user){
      return res.status(401).json({
        title: 'Login failed',
        error: {
          message: 'Invalid Login Credentials'
        }
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) {
        return res.status(500).json({
          title: 'Login failed',
          error: {
            message: 'Invalid Login Credentials'
          }
        });
      }

      if(isMatch){

        console.log("I am here");
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800
          //expiresIn: 1
        });

        return res.status(201).json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }

      else{
        return res.status(401).json({
          title: 'Login failed',
          error: {
            message: 'Invalid Login Credentials',
          }
        });
      }
    });
  });
});

router.post('/profile', passport.authenticate('jwt', {session: false}),(req, res, next) => {
  console.log("user");
  return res.json({user: req.user});
})

router.get('/validate', (req, res, next) => {
  res.send('VALIDATE')
});
module.exports = router;
