const User = require('../models/user');
const Form = require('../models/form');
var mongoose = require('mongoose');
var fs = require('fs');
const path = require('path');

exports.newform = (req,res) => {
    
    if(req.user.usertype == 'TA'){
            Form.find({'FinalSave': true}
                              , function(err, forms) {
                              if (err) return res.status(500).send("There was a problem finding the forms.");
                              res.status(200).render('home',{data: forms, user: req.user});
            });
    }else if(req.user.usertype == 'IA' && req.user.conceptnote.approved == true){
        User.findById(req.userId, 
                    { password: 0 }, 
                        function (err, user) {
                            if (err) return res.status(500).render('failures',{message:'There was a problem finding the user.'});  
                            if (!user) return res.status(500).render('failures',{message:'No user found.'}); 
                            
                            if(user.applicationForms.length == 0){
                                    var form =  new Form({ UId: req.userId});
                                    form.save((err,success) =>{
                                    if(err){
                                        message = "Error"
                                        return res.status(400).render('failures',{message});
                                    }
                                    else{
                                        user.applicationForms.push(form._id);
                                
                                        user.save((err,success) =>{
                                        if(err){
                                            message = "Error"
                                            return res.status(400).render('failures',{message});
                                        }
                                        else{
                                            res.redirect('/dpr/'+ form._id +'/1');
                                        } 
                                        }) 
                                    }
                                    })
                            }
                            else{
                                res.redirect('/dpr/'+ user.applicationForms[0] +'/1');
                            }      
        });
    }
    else{
        res.status(500).render('failures',{message:'No Access!'});
    }
    
}
exports.form1 = (req,res) => {

    Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});  
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        form.ClusterInfo = {
                                Name:req.body.ClusterName,
                                Type:req.body.ClusterType,
                                Location:req.body.Location,
                                Postal:req.body.Postal,
                                State:req.body.State,
                                District:req.body.District,
                                Pincode:req.body.Pincode,
                                MobileNo:req.body.Mobileno,
                                Email:req.body.Email,
                                AltEmail:req.body.Alternateemail,
                                TelephoneNo:req.body.Telephone,
                                FaxNo:req.body.Faxno,
                                Estd:req.body.Year,
                                OrgType:req.body.Type,
                                KeyEconomicActivity:req.body.Key,
                                ExpInClusterDev:req.body.Experience,
                                NoPotentialArtisans:req.body.Potential
                        }
                        form.save((err,success) =>{
                            if(err){
                                console.log(err);
                                message = "Error"
                                return res.status(400).render('failures',{message});
                            }
                             else{
                                res.redirect('/dpr/'+ form._id +'/2');
                            }
                        }) 
            });
    })
}

exports.form2 = (req,res) => {
        var file = JSON.parse(JSON.stringify(req.files));
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        if(req.query.form == '1' ){
                            
                            form.ImplementingAgency = {
                            
                                Name :req.body.Agencyname1,
                                Type : req.body.AgencyType1 ,
                                Pincode: req.body.Pincode1,
                                State: req.body.State,
                                District: req.body.District,
                                Email: req.body.Email1,
                                ContactPersonName: req.body.Cpname1,
                                MobileNo: req.body.Mobileno1,
                                TelephoneNo: req.body.Contactno1,
                                OrgType: req.body.orgtype,
                                RegNo: req.body.Regno1,
                                ValidityDate: req.body.Valdate1,
                                MemorandumOfAssociation: fs.readFileSync(path.join(process.cwd() + '/uploads/' + file.Umafile1[0].filename)),
                                CertificateOfReg: fs.readFileSync(path.join(process.cwd() + '/uploads/' + file.ucrfile1[0].filename)),
                                OrgPAN: fs.readFileSync(path.join(process.cwd() + '/uploads/' + file.Panfile1[0].filename)),
                                AadharNo  :fs.readFileSync(path.join(process.cwd() + '/uploads/' + file.Aadharfile1[0].filename)),
                                AcHolderName :req.body.Name1,
                                BankAcNo :req.body.Accountno1,
                                BankName :req.body.Bname1,
                                BranchCity : req.body.Bcity1,
                                IFSC :req.body.Ifsc1,
                                IADetails: form.ImplementingAgency.IADetails
                            }
                            form.save(function(err){
                            if(!err){
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + file.Umafile1[0].filename))
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + file.ucrfile1[0].filename))
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + file.Panfile1[0].filename))
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + file.Aadharfile1[0].filename))
                                    res.redirect('/dpr/'+ form._id +'/2');
                            }
                            else{
                                console.log(err)
                                message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '2'){
                            
                            IADetails = {
                                        Year :req.body.year1,
                                        FinancialReport :fs.readFileSync(path.join(process.cwd() + '/uploads/' + file.fin1[0].filename)),
                                        ITR :fs.readFileSync(path.join(process.cwd() + '/uploads/' + file.itr1[0].filename)),
                                        Activity: req.body.act1
                                    } 
                            form.ImplementingAgency.IADetails.push(IADetails);
                            form.save(function(err){
                            if(!err){
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + file.fin1[0].filename))
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + file.itr1[0].filename))
                                    res.redirect('/dpr/'+ form._id +'/3');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })   
                        }
                        else{
                            var message = "Page not found"
                            res.status(400).render('failures',{message});     
                        }
            });
        });
}
exports.form3 = (req,res) => {
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        if(req.query.form == '1' ){
              
                            form.SPVDetails = {
                            
                                Structure :req.body.Structure,
                                Compostion: req.body.Details2 ,
                                SPVRegCertificate: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
                                BoardofManagement : form.SPVDetails.BoardofManagement
                            
                            }
                            form.save(function(err){
                            if(!err){
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + req.file.filename))
                                    res.redirect('/dpr/'+ form._id +'/3');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '2'){
                            BoardofManagement = {
                                        Compostion :req.body.comp2,
                                        RoleAndDesignation :req.body.role2,
                                        ContactDetails :req.body.contact2
                                    } 
                            form.SPVDetails.BoardofManagement.push(BoardofManagement);
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/4');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })   
                        }
                        else{
                        var message = "Page not found"
                        res.status(400).render('failures',{message});     
                        }
                        
                    
                    });
            });
}
exports.form4 = (req,res) => {
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        if(req.query.form == '1' ){
                        
                            Products = {
                                        TypeOfProduct :req.body.inlineRadioOptions,
                                        NameofProduct :req.body.name3,
                                        ImageofProduct :fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
                                        PackageCluster :req.body.package
                                    } 
                            form.ClusterProduct.Products.push(Products);
                            form.save(function(err){
                            if(!err){
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + req.file.filename))
                                    res.redirect('/dpr/'+ form._id +'/4');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '2'){
                            form.ClusterProduct = {
                                Products : form.ClusterProduct.Products,
                                LocalProcure :req.body.loc3,
                                OutsideState :req.body.state3,
                                Import :req.body.import3
                            
                            }
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/5');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else{
                        var message = "Page not found"
                        res.status(400).render('failures',{message});     
                        }
            });
        }); 
}
exports.form5 = (req,res) => {
         Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        form.LandDetails = {
                            
                                Category : req.body.Category,
                                NameofOwner: req.body.name4,
                                TotalArea: req.body.land4,
                                LandCost: req.body.cost4,
                                LandAddress: req.body.address4,
                                LandDocument: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename))
                            
                        }
                        form.save(function(err){
                            if(!err){
                                    fs.unlinkSync(path.join(process.cwd() + '/uploads/' + req.file.filename))
                                    res.redirect('/dpr/'+ form._id +'/6');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                        })
            });
        });
}
exports.form6 = (req,res) => {
         Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        form.SoftInterventionDetails = {
                            
                                Type :req.body.Type,
                                ActivityName: req.body.name5 ,
                                CourseOutline: req.body.outline5,
                                NoOfDays: req.body.days5,
                                NoOfParticipant: req.body.Participants5,
                                Amount: req.body.amount5,
                                Trainers: req.body.trainers5,
                                TrainingDeliveryMethod: req.body.method5,
                                RequiredInfrastructureDetails: req.body.infastructure5,
                                AvailabilityOfInfrastructure: req.body.available5
                            
                        }
                        form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/7');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                        })
            });
        });
}
exports.form7 = (req,res) => {
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        if(req.query.form == '1' ){
                        
                            CommonFacilityCentre = {
                                        Name :req.body.cfcname,
                                        Location :req.body.cfclocation,
                                        Amount :req.body.cfcamount
                                    } 
                            form.HardInterventionDetails.CommonFacilityCentre.push(CommonFacilityCentre);
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/7');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '2'){
                            PlantandMachinery = {
                                        NameofTrade :req.body.tradename,
                                        NameofMachine :req.body.machinename,
                                        Specification :req.body.Specification,
                                        Quantity :req.body.quantity,
                                        Rate :req.body.rate,
                                        Amount :req.body.machineamount
                                    } 
                            form.HardInterventionDetails.PlantandMachinery.push(PlantandMachinery);
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/7');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '3'){
                            RawMaterialBank = {
                                        Name :req.body.rmbname,
                                        Location :req.body.rmblocation,
                                        Amount :req.body.rmbamount
                                    } 
                            form.HardInterventionDetails.RawMaterialBank.push(RawMaterialBank);
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/8');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else{
                        var message = "Page not found"
                        res.status(400).render('failures',{message});     
                        }
            });
        });
}
exports.form8 = (req,res) => {
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        form.ProjectCostDetails = {
                            
                                State :req.body.state,
                                HardInterventionCostTotal: req.body.hetotal,
                                HardInterventionCost: {
                                        SfrutiAssistance :req.body.hisa,
                                        IAShare :req.body.hiia
                                },
                                SoftInterventionCostTotal: {
                                        SfrutiAssistance :req.body.sisa,
                                        IAShare :req.body.siia
                                },
                                TechnicalAgencyCost: {
                                        SfrutiAssistance :req.body.tasa,
                                        IAShare :req.body.taia
                                },
                                ImplementingAgencyCost: {
                                        SfrutiAssistance :req.body.iasa,
                                        IAShare :req.body.iaia
                                },
                                SubTotalCost: {
                                        SfrutiAssistance :req.body.stsa,
                                        IAShare :req.body.stia
                                },
                                AnyOtherFunding: {
                                        Name :req.body.other,
                                        Amount :req.body.amount
                                },
                                TotalCost: {
                                        SfrutiAssistance :'total',
                                        IAShare :'total'
                                }
                                
                            
                        }
                        form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/9');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                        })
            }); 
        }); 
}
exports.form9 = (req,res) => {
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        form.ProjectTimeline = {
                            
                                Activity :req.body.Activity,
                                Q1: req.body.Activity ,
                                Q2: req.body.Q2,
                                Q3: req.body.Q3,
                                Q4: req.body.Q4,
                                Q5: req.body.Q5,
                                Q6: req.body.Q6,
                                Q7: req.body.Q7,
                                Q8: req.body.Q8,
                                Q9: req.body.Q9,
                                Q10: req.body.Q10,
                                Q11: req.body.Q11,
                                Q12: req.body.Q12
                            
                        }
                        form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/10');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                        })
            });
        });
}
exports.form10 = (req,res) => {
        
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        form.ExpectedImpact = {

                                TurnOver: {
                                        Year1 :req.body.ty1,
                                        Year2 :req.body.ty2,
                                        Year3 :req.body.ty3,
                                        Year4 :req.body.ty4,
                                        Year5 :req.body.ty5
                                },
                                Wages: {
                                        Year1 :req.body.wy1,
                                        Year2 :req.body.wy2,
                                        Year3 :req.body.wy3,
                                        Year4 :req.body.wy4,
                                        Year5 :req.body.wy5
                                },
                                Production: {
                                        Year1 :req.body.py1,
                                        Year2 :req.body.py2,
                                        Year3 :req.body.py3,
                                        Year4 :req.body.py4,
                                        Year5 :req.body.py5
                                },
                                Sales: {
                                        Year1 :req.body.sy1,
                                        Year2 :req.body.sy2,
                                        Year3 :req.body.sy3,
                                        Year4 :req.body.sy4,
                                        Year5 :req.body.sy5
                                },
                                ArtisansNo: {
                                        Year1 :req.body.ay1,
                                        Year2 :req.body.ay2,
                                        Year3 :req.body.ay3,
                                        Year4 :req.body.ay4,
                                        Year5 :req.body.ay5
                                }
                                
                            
                        }
                        form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/11');
                            }
                            else{
                                console.log(err)
                                var message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                        })
            });
        });
}
exports.form11 = (req,res) => {
        
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        if(req.query.form == '1' ){
                        
                            AnnualProduction = {
                                    ProductName :req.body.apname,
                                    Quantity :req.body.apquantity,
                                    Unit :req.body.apunit,
                                    Rate :req.body.aprate,
                                    Value :req.body.apvalue
                                }
                            form.TentativeBussinessPlan.AnnualProduction.push(AnnualProduction);
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/11');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '2'){
                            SalesTurnover = {
                                    ProductName :req.body.stname,
                                    Quantity :req.body.stquantity,
                                    Unit :req.body.stunit,
                                    Rate :req.body.strate,
                                    Value :req.body.stvalue
                                }
                            form.TentativeBussinessPlan.SalesTurnover.push(SalesTurnover);
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/11');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else if(req.query.form == '3'){
                            
                            form.TentativeBussinessPlan = {
                                AnnualProduction : form.TentativeBussinessPlan.AnnualProduction,
                                SalesTurnover :form.TentativeBussinessPlan.SalesTurnover,
                                AnyBuyBackAgreement :req.body.buyback,
                                AnyTieUpWithOutlet :req.body.tieup,
                                OtherModeofMarketing :req.body.bankingmode,
                                AnyOtherInfo: req.body.otherinfo
                            }
                            form.save(function(err){
                            if(!err){
                                    res.redirect('/dpr/'+ form._id +'/12');
                            }
                            else{
                                console.log(err)
                                    message = "DB error"
                                res.status(400).render('failures',{message});
                            }
                            })
                        }
                        else{
                        var message = "Page not found"
                        res.status(400).render('failures',{message});     
                        }
            });
        });
}
exports.form12 = (req,res) => {
    
        Form.findById(req.params.id, function (err, form) {
            if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'}); 
            User.find({
                    'applicationForms' : mongoose.Types.ObjectId(form._id)},{
                    '_id': req.userId
                     }, function(err,user){
                        if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});
                        if(user.length==0) return res.status(500).render('failures',{message:'No User found'});
                        if(user[0]._id != req.userId )  return res.status(500).render('failures',{message:'Unauthorized.'});
                        if(req.query.form == '1'){
                            ArtisanDetails = {
                                        Name  :req.body.artname,
                                        FatherorHusbandName :req.body.faname,
                                        Gender :req.body.Gender,
                                        Age  :req.body.age,
                                        Category :req.body.Category,
                                        AadharorEpic  :req.body.adorepic,
                                        MobileNo :req.body.mbno,
                                        BankACNo :req.body.bnkacno,
                                    }
                            form.ArtisanDetails.push(ArtisanDetails);
                            form.save(function(err){
                                if(!err){
                                        res.redirect('/dpr/'+ form._id +'/12');
                                }
                                else{
                                    console.log(err)
                                        message = "DB error"
                                    res.status(400).render('failures',{message});
                                }
                                })        
                        }
                        else if(req.query.form == '2'){
                            form.FinalSave = true;
                            form.save(function(err){
                                if(!err){
                                        res.redirect('/dpr/'+ form._id +'/12');
                                }
                                else{
                                    console.log(err)
                                        message = "DB error"
                                    res.status(400).render('failures',{message});
                                }
                                })

                        }
                        else{
                            var message = "Page not found"
                            res.status(400).render('failures',{message});     
                            }     
            });  
        }); 
}