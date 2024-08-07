const user = require("../models/user");

async function checkAdmin(req,res,next){
    const userId = req.user;
    console.log(userId);
    const profile=await user.findById(userId);
    console.log(profile.role);
    if(profile.role != "admin"){
        return res.status(404).json("You are'nt admin");
    }
    next();
};

module.exports = {checkAdmin};