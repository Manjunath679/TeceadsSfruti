const nodemailer = require('nodemailer')
require('dotenv').config({path:__dirname+'/../.env'});
module.exports = nodemailer.createTransport({
    host :  "smtp.gmail.com",
    port : "465",
    secure : true,
    service : "Gmail",
    auth:{
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD ,
    }
})