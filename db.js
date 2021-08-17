const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}
).then(()=>{
    console.log('DB connection successful!')
}).catch((e)=>{
    console.log('DB connection failed!')
})