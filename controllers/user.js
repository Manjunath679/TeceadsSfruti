const bcrypt = require('bcrypt');
const User = require('../models/user');
const Form = require('../models/form');

//test route to create TA account
exports.createta = (req,res) =>{
     username='ta'
     email='test@123'
     password='12345678'
     User.findOne({email}).exec((err,user) =>{
        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});                                      
        //if email already exists
        if(user){
            var message = "Emailid already registered!"
            return res.status(400).render('failures',{message});
        }
        //hashing password
        bcrypt.hash(password, 10, function(err, hashedpass) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'}); 
            password = hashedpass;
            
            //adding new user with hashed password
            let newUser = new User({name: username,email,password});
            newUser.usertype='TA'
            newUser.verified=true 
            newUser.save((err,success) =>{
                if(err){
                    // if any other error in signup
                    console.log(err)
                    message = "Error in registration "
                    return res.status(400).render('failures',{message});
                }
               
                else{
                    res.redirect('/login');
                  
                }
            })
        });
    })
}     


exports.home = (req,res) =>{
      
     if(req.user.usertype == 'TA'){
          res.redirect('/dpr')
     }
     else{
          User.findById(req.userId, 
                         { password: 0 }, // projection
                         function (err, user) {
                              if (err) return res.status(500).render('failures',{message:'There was a problem finding the user.'});
                              if (!user) return res.status(500).render('failures',{message:'No user found.'});
                              Form.find({
                                   '_id': { $in: user.applicationForms }
                                   }, function(err, forms) {
                                   if (err) return res.status(500).send("There was a problem finding the forms.");
                                   res.status(200).render('home',{data: forms, user: user});
                              });
                              
          });
     } 
}

exports.clusteroverview = (req,res) =>{
      Form.find({'FinalSave': true}, 
                  function(err, forms) {
                  if (err) return res.status(500).render('failures',{message:'There was a problem finding the forms'});
                  res.status(200).render('clusteroverview',{data: forms, user: req.user});
      });  
}

exports.clusterdetails =(req,res) => {
      Form.findById(req.params.id,function(err, form) {
            if (err) return res.status(500).render('failures',{message:'There was a problem finding the forms'});
            if(!form) return res.status(500).render('failures',{message:'Invalid Form'});
            if(req.query.form == '1' ){
                 res.status(200).render('view1',{data: form, user: req.user});
            }
            else if(req.query.form == '2'){
                 res.status(200).render('view2',{data: form, user: req.user}); 
            }
            else if(req.query.form == '3'){
               
                 res.status(200).render('view3',{data: form, user: req.user}); 
            } 
            else if(req.query.form == '4' && req.query.name == 'all'){
                 res.status(200).render('view4',{data: form, user: req.user}); 
            }
            else if(req.query.form == '4' && req.query.name != 'all'){
                 
                 for(var i=0;i<form.ArtisanDetails.length;i++){
                      
                      if(form.ArtisanDetails[i].Name.toUpperCase() != req.query.name.toUpperCase()){
                         form.ArtisanDetails.splice(i, 1);
                      }
                 }
                 res.status(200).render('view4',{data: form, user: req.user}); 
            }  
            else if(req.query.form == '5'){
                 res.status(200).render('view5',{data: form, user: req.user}); 
            } 
            else if(req.query.form == '6'){
                 res.status(200).render('view6',{data: form, user: req.user}); 
            }
            else if(req.query.form == '7'){
                 res.status(200).render('view7',{data: form, user: req.user}); 
            }
            else{
                 return res.status(500).send("Page not found.");  
            }       
      });
}

exports.conceptnote = (req,res) => {
      
      User.findById(req.userId, 
                      { password: 0 }, // projection
                      function (err, user) {
                      if (err) return res.status(500).render('failures',{message:'There was a problem finding the user.'});     
                      if(!user) return res.status(500).render('failures',{message:'No user found!'});  
                      user.conceptnote = {
                         approved: false,
                         nameia: req.body.nameofIA,
                         addressia: req.body.addressofIA,
                         formationyear: req.body.year,
                         netincome: req.body.income,
                         locationcfc : req.body.CFClocation,
                         natureofland : req.body.nature,
                         areaofland : req.body.area,
                         timeia : req.body.time,
                         VillageName : req.body.VillageName,
                         Distancefromcfc : req.body.Distance,
                         population : req.body.population,
                         noOfArtisans : req.body.Artisans,
                         noOfBeneficiaries : req.body.Beneficiaries,
                         howtheybenefited : req.body.benefited,
                         timelistbeneficiaries : req.body.TimeTaken,
                         timeformSPV : req.body.Timetoform,
                         nameofproduct : req.body.ProductName,
                         descriptionofprocess : req.body.BriefDescription,
                         cfcSize : req.body.CFCsize,
                         constructionCost : req.body.constructioncost,
                         RawMaterial : req.body.Details,
                         RMAvailability : req.body.currentavailability,
                         Areaundercrop: req.body.Currentarea,
                         ProductionInVillages: req.body.VillagesProduction,
                         MachineType: req.body.MachineType,
                         MachineCost: req.body.MachinesCost,
                         TotalCost: req.body.ConstructionCost,
                         MarketProduct: req.body.Plan
                    }
                    user.save(function(err){
                         if(!err){
                              res.redirect('/home')
                         }
                         else{
                              console.log(err)
                              var message = "DB error"
                              res.status(400).render('failures',{message});
                         }
                    })
     })

}