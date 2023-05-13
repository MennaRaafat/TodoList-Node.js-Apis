const mongoose=require('mongoose');

const {Schema} = mongoose;

const todoSchema = new Schema({

    name:{
        type:String,
        required:['true','The name of todo is required'],
        minLength:3,
        maxLength:15
    },
    status:{
        type:String,
        enum:['to-do','in-progress','done'],
        default:'to-do'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
});

const Todo = mongoose.model('Todo',todoSchema);

module.exports=Todo;