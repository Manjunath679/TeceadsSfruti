const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/../.env'});

let transporter = require('./mailer');

exports.login = (req,res) =>{
       //finding user in db
       User.findOne({ email: req.body.email }, function (err, user) {
               if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
               if (!user) return res.status(404).render('failures',{message:'Email not registered. Signup to continue'});
    
               // check if the password is valid or not
               var passwordValid = bcrypt.compareSync(req.body.password, user.password);
               if (!passwordValid) return res.status(401).render('failures',{message:'Wrong email or password!'});
               //check if user is verified if not redirect to email verification page
               if(user.verified===false) return res.status(200).redirect('/emailverificationpage');
               // creating token with payload as object id of user
               var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                   expiresIn: 86400   //24 hour lifetime of token
               });
               // setting cookie with token and redirecting to dashboard
               return res.cookie('token', token, {
                 secure: false, 
                 httpOnly: true,
              }).redirect('/home');
    });

}


exports.forgot = (req,res) =>{
            //Checking if user exist
            User.findOne({email: req.body.email},(err,user)=>{
                if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                if(!user){
                    return res.render('failures',{message: 'Emailid not registered!'});
                }
                
                //creating token
                token = crypto.randomBytes(20).toString('hex')
               
                //Setting user unique token
                user.resetPasswordToken = token;
                //token expiry time 1 hour
                user.resetPasswordExpires = Date.now() + 3600000;
                
                //Saving in db
                user.save((err)=>{
                    if (err) return res.status(500).render('failures',{message:'Internal server problem.'});

                    //reset link mail
                    var mailOptions = {
                       to: user.email,
                       subject:"Password Reset",
                       text:'click the link\n\n' + 'http://' + req.headers.host + '/reset/' + token +'\n\n'
               
                    };
                    transporter.sendMail(mailOptions,(err,info)=>{
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        res.render('failures',{message: 'Email has been sent to you email for changing password'})
                    })
                })
            })
            
           
    }
    
exports.recover = (req,res) =>{
        //finding user with reset token
        User.findOne({resetPasswordToken:req.params.token,resetPasswordExpires:{$gt: Date.now()}},(err,user)=>{
           if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
           if(!user)
           {
               return res.status(404).send('password reset token is invalid or expired')
           }

           //hashing new password
           bcrypt.hash(req.body.password, 10, function(err, hashedpass) {
                  if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                  user.password = hashedpass;

                  //saving new password
                  user.save((err)=>{
                     if(err) if (err) return res.status(500).render('failures',{message:'DB problem.'});
                     res.render('login')
                  })
            });
        })

    }
