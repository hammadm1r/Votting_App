const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true,
        enum:['voter','candidate']
    }
})
userSchema.pre('save', async function(next){
    const user= this;
    if(!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        console.log('Password is Hashed');
        next();
    } catch (error) {
        return next(error);
    } 
})

userSchema.methods.comparePassword= async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        if(!isMatch){
            return false;
        }
        return isMatch;
    } catch (error) {
        throw error;
    }
}

module.exports = mongoose.model('User', userSchema);


