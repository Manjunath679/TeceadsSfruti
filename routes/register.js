var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

var {checkrole} = require('../controllers/checkrole');
var {autho} = require('../controllers/autho');
const {signup} = require('../controllers/signup')
const {sendotp,otpcon} = require('../controllers/otp')


router.get('/signup',autho, checkrole, function(req,res){                         //to render signup page    
    res.render('signup')
})
router.post('/signup',autho, checkrole, signup);                                  //check for exisiting user if not add new user and redirect to email verification



router.get('/emailverificationpage',function(req,res){           //Page berfore sending otp to enter email   
    res.render('emailverificationpage')
})
router.post('/emailverificationpage', function(req,res){       //redirect to send otp 
    res.redirect('/emailverification?email='+req.body.email)
});          


router.get('/emailverification', sendotp)                        //send otp
router.post('/emailverification', otpcon);                      //To verify the otp

module.exports = router;

