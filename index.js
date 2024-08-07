const express = require('express');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser')
const auth = require('./routers/auth');
const vote = require("./routers/vote");
const admin = require("./routers/admin");
require('dotenv').config();
const logs = (req,res,next) =>{
    console.log(req.method, req.url, req.body);
    next();
}

const PORT = process.env.PORT;
app.listen(PORT);
app.use(bodyParser.json());
app.use('/auth', logs,auth);
app.use("/vote",logs,vote);
app.use("/admin",logs,admin);
app.get('/',(req,res)=>{
    res.send('Hello World')
})