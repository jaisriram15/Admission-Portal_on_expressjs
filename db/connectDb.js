const mongoose = require('mongoose');


const connectDb=()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/school-portal')
    .then(()=>{
        console.log("DB connection sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports=connectDb
