const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.URI;
mongoose.connect(URI);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("Connected To MongoDB");
})
db.on('error', (err)=>{
    console.log(`Connected To MongoDB:${err}`);
})
db.on('disconnected', ()=>{
    console.log(`Disconnected To MongoDB`);
})
