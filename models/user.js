const mongoose =require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const Userschema = new Schema({
    conceptnote : {
            approved: {
                type: Boolean,
            },
            nameia: {
                type: String
            },
            addressia: {
                type: String
            },
            formationyear: {
                type: String
            },
            netincome: {
                type: String
            },
            locationcfc : {
                type: String
            },
            natureofland : {
                type: String
            },
            areaofland : {
                type: String
            },
            timeia : {
                type: String
            },
            VillageName : {
                type: String
            },
            Distancefromcfc : {
                type: String
            },
            population : {
                type: String
            },
            noOfArtisans : {
                type: String
            },
            noOfBeneficiaries : {
                type: String
            },
            howtheybenefited : {
                type: String
            },
            timelistbeneficiaries : {
                type: String
            },
            timeformSPV : {
                type: String
            },
            nameofproduct : {
                type: String
            },
            descriptionofprocess : {
                type: String
            },
            cfcSize : {
                type: String
            },
            constructionCost : {
                type: String
            },
            RawMaterial : {
                type: String
            },
            RMAvailability : {
                type: String
            },
            Areaundercrop: {
                type: String
            },
            ProductionInVillages: {
                type: String
            },
            MachineType: {
                type: String
            },
            MachineCost: {
                type: String
            },
            TotalCost: {
                type: String
            },
            MarketProduct: {
                type: String
            }

    },
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    otp:{
        type: String,
    },
    usertype:{
        type: String,
        default: 'IA'
    },
    verified:{
        type: Boolean,
        default: false
    },
    resetPasswordToken:{ 
        type: String,
    },
    resetPasswordExpires:{
        type: Date,
    },
    applicationForms:[
        ObjectId,
    ]
})

const User = new mongoose.model("users",Userschema);

module.exports = User;