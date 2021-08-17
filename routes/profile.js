var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
const User = require('../models/user');
var {autho} = require('../controllers/autho');
var {checkrole} = require('../controllers/checkrole');
const {createta, home, clusteroverview, clusterdetails, conceptnote} = require('../controllers/user')

router.get('/createta', createta) //test route to create TA account
router.get('/home',autho, home)
router.get('/clusteroverview',autho, checkrole, clusteroverview)
router.get('/clusteroverview/:id',autho, checkrole, clusterdetails)
router.get('/conceptnote',autho, function(req,res){
    if(req.user.usertype == 'TA'){
       User.find({'usertype': 'IA','conceptnote.approved': false}, 
                  function(err, users) {
                  if (err) return res.status(500).render('failures',{message:'There was a problem finding the forms'});
                  res.status(200).render('conceptnotelist',{user: req.user,users: users});
      });
    }
    else{
       if(req.user.conceptnote.approved == true){
            res.status(200).render('failures',{message:'Your Conceptnote is accepted'});
       }
       else{
            res.render('conceptnote',{user : req.user})
       }
    }   
})
router.get('/conceptnote/view/:id',autho, checkrole,function(req,res){
    User.findById(req.params.id,function(err,data){
         if(err)
         console.log(err)
         else
         res.render('conceptnoteinfo',{user: req.user,users:data});
    })
})

router.post('/conceptnote',autho, conceptnote)
 
router.post('/conceptnoteinfo/:id',autho,checkrole,function(req,res){
     User.findByIdAndUpdate(req.params.id,{'conceptnote.approved':true},function(err,data){
          if(err)
          console.log(err)
          else
          res.redirect('../conceptnote')
     });
   
})



module.exports = router;
