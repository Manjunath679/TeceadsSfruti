var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('../models/user');
var Form = require('../models/form');
var {autho} = require('../controllers/autho');
var {newform,form1,form2,form3,form4,form5,form6,form7,form8,form9,form10,form11,form12} = require('../controllers/forms');

var multer = require('multer'); 
var storage = multer.diskStorage({  
    destination:function(req,file,cb){  
         cb(null,'uploads/')  
    }
})  
var upload = multer({storage:storage});  

router.get('/dpr', autho, newform)
router.get('/dpr/:id/1', autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('1',{data : form, user: req.user}); 
            });
        })        
})

router.get('/dpr/:id/2',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('2',{data : form, user: req.user});
            });              
            
    }) 
})

router.get('/dpr/:id/3',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('3',{data : form, user: req.user});
            });              
            
    }) 
})

router.get('/dpr/:id/4',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('4',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/5',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('5',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/6',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('6',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/7',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('7',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/8',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('8',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/9',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('9',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/10',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('10',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/11',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('11',{data : form, user: req.user}); 
            });              
            
    }) 
})

router.get('/dpr/:id/12',autho, function(req,res){                        
    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
            if(!form) return res.status(500).render('failures',{message:'Not Found 404.'});
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal server problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No user found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        res.render('12',{data : form, user: req.user});
            });              
            
    }) 
})

router.post('/dpr/:id/1',autho, form1)
router.post('/dpr/:id/2',[autho, upload.fields([{
           name: 'Umafile1', maxCount: 1
         }, {
           name: 'ucrfile1', maxCount: 1
         },{
           name: 'Panfile1', maxCount: 1
         },{
           name: 'Aadharfile1', maxCount: 1
         },{
           name: 'fin1', maxCount: 1
         },{
           name: 'itr1', maxCount: 1
         }])
        ], form2)
router.post('/dpr/:id/3',[autho, upload.single('Certificate2')], form3)
router.post('/dpr/:id/4',[autho, upload.single('image3')], form4)
router.post('/dpr/:id/5',[autho, upload.single('document4')], form5)
router.post('/dpr/:id/6',autho, form6)
router.post('/dpr/:id/7',autho, form7)
router.post('/dpr/:id/8',autho, form8)
router.post('/dpr/:id/9',autho, form9)
router.post('/dpr/:id/10',autho, form10)
router.post('/dpr/:id/11',autho, form11)
router.post('/dpr/:id/12',autho, form12)





module.exports = router;