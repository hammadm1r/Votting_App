const express = require('express');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser')
const auth = require('./routers/auth');
require('dotenv').config();
const logs = (req,res,next) =>{
    console.log(req.method, req.url, req.body);
    next();
}

const PORT = process.env.PORT;
app.listen(PORT);
app.use(bodyParser.json());
app.use('/auth', logs,auth);
app.get('/',(req,res)=>{
    res.send('Hello World')
})