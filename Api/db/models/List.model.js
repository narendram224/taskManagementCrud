const mongose = require('mongoose');

const ListSchema  =new mongose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
})
module.exports  = mongose.model("List",ListSchema);
  



