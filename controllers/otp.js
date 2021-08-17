const User = require('../models/user');
require('dotenv').config();
let transporter = require('./mailer');

exports.sendotp = (req,res) =>{
           var emailid = req.query.email;  
           User.findOne({email: emailid}).exec((err,user) =>{ 
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(user){
                var otp = Math.random();
                otp = otp*1000000;
                otp = parseInt(otp);
                user.otp = otp;
                user.save(function(err){
                   if(err){
                       var message = "DB error"
                       res.status(400).render('failures',{message});
                   }
                })
                var mailOptions  = {
                    to: req.query.email,
                    subject:"OTP for registration is: ",
                    html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + user.otp + "</h1>"
                };
                transporter.sendMail(mailOptions,(err,info) =>{
                    if(err)
                    {
                        console.log(err);
                        message = "Unable to send mail"
                        return res.status(400).render('failures',{message});
                        
                    }
                    emailid = encodeURIComponent(req.query.email);
                    res.render('emailverification',{email: emailid});
                })
            }
            else{
                message = "Emailid not found"
                res.status(400).render('failures',{message});
            }
            })
    }

 //for verifying otp
exports.otpcon = (req,res) =>{
    emailid = req.query.email;
    User.findOne({email: emailid}).exec((err,user) =>{ 
    if (err) return res.status(500).render('failures',{message:'Internal server problem.'});    
    if(user){
        if(req.body.otp==user.otp)
        {
            user.verified= true;
            user.save(function(err){
                   if(!err){
                        console.log('Verified')
                   }
                   else{
                       console.log(err)
                       var message = "DB error"
                       res.status(400).render('failures',{message});
                   }
                })
            res.redirect('/login')
        }
        else{
            var message = "OTP is incorrect"
            return res.status(400).render('emailverification',{email: emailid, message});
        }
    }
    else{
        message = "Emailid not found"
        res.status(400).render('failures',{message});
    } 
})
}
 