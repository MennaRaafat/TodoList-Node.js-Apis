const express = require('express');
const router = express.Router();
const todoController = require('../controllers/TodoController');
const {asycnWrapper}=require("../lib")
const User = require('../modles/User');
const jwt = require('jsonwebtoken');
const {JWT_SECRET = 'test'} = process.env; 

var token;

router.use(async(req,res,next)=>{
const {authorization} = req.headers;
token = jwt.verify(authorization,JWT_SECRET);
const user = await User.findById(token.id).exec();
console.log(token)
req.user = user;
next();
});

router.post('/', async(req,res,next)=>{
    try{
        const createTodo = await todoController.create({
            name:req.body.name,
            status:req.body.status,
            userId:req.user._id
        });
        res.json({createTodo});
    }catch(err){
        res.status(404).json({
            messaage:err
        });
    }
});

router.get('/' , async(req,res,next)=>{

try{
const getTodo = await todoController.get();
res.json({getTodo})
}catch(err){
    res.status(404).json({
        messaage:err
    });
}
});

router.get('/:id', async (req,res,next)=>{

try{
const id = req.params.id;
const getTodoById = await todoController.getById(id);

//   if( !id ){
//     res.status(404).json({
//         messaage:"Id not found"
//     }); }
//     else{
        res.json({getTodoById});

    // }

}catch(err){
    res.status(404).json({
        messaage:err
    });
}


});

router.delete('/:id', async(req,res,next)=>{
    try{
        const id = req.params.id;
        const deleteById = await todoController.deleteById(id);
        res.json({message:"item which deleted is below",deleteById});
    }catch(err){
        res.status(404).json({
            messaage:err
        });
    }
});


router.patch('/:id', async (req, res, next) => {
    const { name, status } = req.body;
    const { id } = req.params;
    const [err, data] = await asycnWrapper(todoController.updateById({ _id: id }, { name, status }))
    if (err) return next(err);
    res.status(200).json({ message: "success", todo: data });
});


module.exports=router