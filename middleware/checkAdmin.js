const user = require("../models/user");

async function checkAdmin(req,res,next){
    const userId = req.user;
    const profile= user.findById(userId);
    if(profile.role === 'admin'){
        next();
    }
    return res.status(404).json("You are'nt admin");
};

module.exports = {checkAdmin};