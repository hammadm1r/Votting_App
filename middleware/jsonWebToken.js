const json = require('jsonwebtoken');
require('dotenv').config()
const authToken =(req,res,next) =>{
    if(
        !req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')
    ){
        return res.status(404).json('Not Found Authorization');
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = json.verify(token,process.env.PRIVATE_KEY);
        if(!decoded){
            return res.status(401).json('Not Authorized');
        }
        req.user= decoded;  
        next();
    } catch (error) {
        return res.status(404).json(error);
    }
}
const genToken = (id) =>{
    const token = json.sign(id,process.env.PRIVATE_KEY);
    return token;
}

module.exports = {genToken,authToken}