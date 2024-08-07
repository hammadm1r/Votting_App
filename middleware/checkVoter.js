const user = require("../models/user");

async function checkVoter(req,res,next){
    const userId = req.user;
    const profile=await user.findById(userId);
    console.log(profile.role);
    if(profile.isVoted != false ){
        return res.status(404).json("You Already Casted Your Vote");
    }
    next();
};

module.exports = {checkVoter};