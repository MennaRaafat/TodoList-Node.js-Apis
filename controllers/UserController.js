const User = require('../modles/User');
const jwt = require('jsonwebtoken');
const {JWT_SECRET = 'test'} = process.env; 

var token;

const create = (data) => User.create(data);

const login = async ({email, password}) =>{
const user= await User.findOne({email}).exec();
const valid = user.verifyPassword(password);
if(valid){
token = jwt.sign({email , id:user._id},JWT_SECRET);
return token
}else{
    throw (new Error('UN_AUTHENTICATED'));
}
}

const get = () => User.find();

const getUserById = (id) =>  User.findById(id).select({ firstName: 1, _id: 0 });


const deleteUserById = async (id) => {
    let user= await User.findByIdAndDelete(id)
if (!user) throw new Error('user not found');
return user;
  };

  
const updateUserById = async (id,data) => {
    const user = await User.findById(id)
    if (!user) throw new Error('user not found')

    const newUser= await User.findByIdAndUpdate(id, data, { new: true })
    if (!newUser) throw new Error('error updating User')
    return newUser;
};


module.exports={
    create,
    login,
    get,
    getUserById,
    deleteUserById,
    updateUserById
}