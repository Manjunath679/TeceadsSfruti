var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

var User = require('../models/user');
const {login,forgot,recover} = require('../controllers/login')
var {autho} = require('../controllers/autho');

router.get('/login', function(req,res){                        //for rendering login page 
        res.render('login');
})
router.post('/login', login)                                   //for verifying credentials


router.get('/logout',autho,function(req,res){                  //for logout by clearing token
     res.cookie('token', '', {
                 secure: false, 
                 httpOnly: true,
              }).redirect('/login');
})

router.get('/forgot', function(req,res){                      //for rendering forgot password page
        res.render('forgotpass');
})
router.post('/forgot', forgot)                                //for sending password change link


router.get('/reset/:token',function(req,res){                //rendering change password 
    User.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt: Date.now()}},(err,user)=>{
           if(err){
               message = "DB Error"
               return res.status(400).render('failures',{message});  
           }
           if(!user)
           {
               return res.status(404).send('password reset token is invalid or expired');
           }
           res.render('recover',{token: req.params.token});
     })                 
})
router.post('/reset/:token', recover)                        //storing new password

module.exports = router;