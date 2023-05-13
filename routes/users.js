const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController");
const todoController=require("../controllers/TodoController")
const {asycnWrapper} = require("../lib");
const { auth } = require('../middleware/auth');


router.post('/', async(req,res,next)=>{
    try{
const createUser = await userController.create({
    username:req.body.username,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    dateOfBirth:req.body.dateOfBirth
});
res.json({createUser});
    }catch(err){
        res.status(404).send(err);
    }
});

router.post('/login' , async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
     
    const token = await userController.login({email,password});
    res.json(token);
})

router.get('/', async(req,res,next)=>{
    try{
        const getUser = await userController.get();
        res.json({getUser});
    }catch(err){
        res.status(404).send(err);
    }
});

router.get('/:id',auth, async(req,res,next)=>{
    try{
const id = req.params.id;
const getUserById = await userController.getUserById(id);
res.json({getUserById});
    }catch(err){
        res.status(404).send(err);  
    }
});


router.delete('/:id',auth,async (req, res, next) => {
    const { id } = req.params
    const [err, data] = await asycnWrapper(userController.deleteUserById(id))
    if (err) return next(err);
    res.status(200).json({ message: "deleted success" });
});

router.patch('/:id',auth,async (req, res, next) => {
    const { body: { firstName, lastName, username, dob, email, password } } = req;
    const { id } = req.params;
    const user = userController.updateUserById({ _id: id }, { firstName, lastName, username, dob, email, password });
    const [error, data] = await asycnWrapper(user);
    if (error) {
        return next(error);
    }
    res.status(200).json(data);
});

router.get('/:id/todos', async (req, res, next) => {
    const { id } = req.params
    const [error, data] = await asycnWrapper( todoController.getUserTodos({userId:id}));
    if(error) next(error);
    res.status(200).json(data);
});

module.exports=router