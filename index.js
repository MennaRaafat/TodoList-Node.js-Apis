const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");
const app = new express();
const PORT=3000;

const MONGO_URL = "mongodb://127.0.0.1:27017/study";

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,  
})   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));


app.use(express.json());

app.use(routes);

app.listen(PORT,()=>{
console.log(`connection on ${PORT} success`);
})