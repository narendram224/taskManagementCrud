const mongose = require('mongoose')

const TaskSchema  = new mongose.Schema({
    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
     _listId:{
        type:mongose.Types.ObjectId,
        required:true
    },
    completed:{
            type:Boolean,
            default:false
    }
})

module.exports = mongose.model("Task",TaskSchema)
