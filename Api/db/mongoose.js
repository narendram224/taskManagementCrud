// this is handle the database and its connection

const mongoose = require('mongoose')

// connection the database of mongodb

mongoose.connect("mongodb://root:root123@ds149676.mlab.com:49676/taskmanagement",{useNewUrlParser:true},(err)=>{
    if (err) {
        console.log("database is not connted ",err);
    }else{
        console.log("database is connected successfully!");
    }
})
// to prevent the deprection warning (for the mongodb native drive)
mongoose.set('userCreateIndex',true);
mongoose.set('userFindAndModify',false);


// mongoose.connect("mongodb://root:root123@ds149676.mlab.com:49676/taskmanagement",{useNewUrlParser:true}).then(()=>{
//     console.log("database is connnected successfully !");
// }).catch((err)=>{
//     console.log("database is not connected successfully :",err);
// })


module.exports = {mongoose};