const user = require('../models/user')
const {genToken,authToken}  = require('../middleware/jsonWebToken');
const login = async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password ){
        res.status(400).json("Fill All The Field");
    }
    const userId = await user.findOne({email:email});
    if(!userId){
        res.status(400).json("User Not Exits");
    }
    const isMatch = await userId.comparePassword(password);
    if(!isMatch){
        res.status(400).json("Wrong Password");
    }
    const jwt = genToken(userId.id);
    res.status(200).json(jwt);
}

const signup = async(req,res) =>{
    try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const jobType = req.body.jobType;
    if (!username || !email || !password || !jobType ){
        res.status(400).json("Fill All The Field");
    }
    const exitedUser = await user.findOne({$or: [{email:email},{name:username}]});
    if(exitedUser){
        res.status(400).json("User Already Exits");
    }
    const newUser = new user();
    newUser.name= username;
    newUser.password= password;
    newUser.email= email;
    newUser.jobType= jobType;
    const response = await newUser.save();
    const jwt = genToken(response.id);
    res.status(200).json(jwt);
    } catch (error) {
        res.status(400).json(error);
    }
}
const id = (req,res) => {
    res.json(req.user);
}

module.exports = {login,signup,id};