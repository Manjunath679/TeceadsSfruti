const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req,res) =>{
    var {name,email,password} = req.body;
    emailid = email;
    User.findOne({email}).exec((err,user) =>{
        if(err){ message = "DB Error"
            return res.status(400).render('failures',{message});                                     
        }//if email already exists
        if(user){
             message = "Emailid already registered!"
            return res.status(400).render('failures',{message});
        }
        //hashing password
        bcrypt.hash(password, 10, function(err, hashedpass) {
            if(err){ message = "Server Error"
            return res.status(400).render('failures',{message});                                     
            }
            password = hashedpass;
            
            //adding new user with hashed password
            let newUser = new User({name,email,password}); 
            newUser.save((err,success) =>{
                if(err){
                    // if any other error in signup
                    message = "Error in registration"
                    return res.status(400).render('failures',{message});
                }
                //redirecting to home
                else{
                    console.log('Account created!')
                    res.status(400).redirect('/home');
                  
                }
            })
        });
    })
}




