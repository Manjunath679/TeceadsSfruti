const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const db = require('./db');
const path = require('path');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/static')))
app.use(cors());
app.use(cookieParser());

app.set('view engine','ejs')                                 //setting template engine
app.set('views',[path.join(__dirname, '/views'),path.join(__dirname, '/views/forms'),path.join(__dirname, '/views/overviewforms')]);
const register = require('./routes/register')
const profile = require('./routes/profile')
const login = require('./routes/login')
const forms = require('./routes/forms')

app.use(register);                                          //routes for signup and otp verification
app.use(profile);                                           //routes for viewing profile,editing
app.use(login);                                             //routes for login, forgot password, logout
app.use(forms);                                             //routes for forms

var port = process.env.PORT || 3000                             
app.listen(port,function(){                                 //Running the server on specified port 
    console.log('Server up on port ' + port)
 })