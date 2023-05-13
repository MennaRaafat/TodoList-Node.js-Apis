const Todo = require('../modles/Todo');

const create = (data) => Todo.create(data);

const get = () =>Todo.find();

const getById = (id) => Todo.findById(id);

const deleteById = (id) => Todo.findByIdAndDelete(id);

const updateById = async (id, data) => {
    let todoo= await Todo.findById(id)
    if (!todoo) throw new Error('todo not found')
  
    let newTodoo = await Todo.findByIdAndUpdate(id, data, { new: true })
    if (! newTodoo) throw new Error('error updating todo')
    return  newTodoo;
}

const getUserTodos =async (userId) => {
    let todoo= await Todo.find(userId)
    return todoo;
}

module.exports={
    create,
    get,
    getById,
    deleteById,
    updateById,
    getUserTodos
}

