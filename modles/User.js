const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

username:{
type:String,
required:[true,'username is required'],
minLength :4,
maxLength:25,
trim:true,
unique:true
},
firstName:{
    type:String,
    required:[true,'First Name is required'],
    minLength :4,
    maxLength:25  
},
lastName:{
    type:String,
    required:[true,'Last Name is required'],
    minLength :4,
    maxLength:25   
},
email:{
type:String,
required:[true,'Email is required'],
unique:true
},
password:{
    type:String,
    required:[true,'Password is required'],
    minLength :5,
    maxLength:10  
},
dateOfBirth:Date,
createdAt: {
    type: Date,
    timeStamp: true,
},

updatedAt: {
    type: Date,
    timeStamp: true,

},
},
{
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    },

});


userSchema.pre('save',function preSave(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})

userSchema.methods.verifyPassword = function verifyPassword(password){
    return bcrypt.compareSync(password,this.password);
  
}

const User = mongoose.model('User',userSchema);

module.exports=User