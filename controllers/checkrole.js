const User = require('../models/user');
exports.checkrole = (req,res,next) => {
    User.findById(req.userId, 
                      { password: 0 }, // projection
                      function (err, user) {
                      if(!user) return res.status(404).send("No user found.");
                      if(user.usertype=='IA'){
                            return res.status(404).send("Access Denied!");
                      }
                      else{
                            next()
                      }   
    })
    
}