const mongoose = require('mongoose');
const User = require('./user')
const candidateSchema = new mongoose.Schema({
    _id :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required :true
    },
    partyName:{
        type:String,
        required:true
    },
    votes:[{
        voters:{
            _id : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required :true,
        },
        votedAt:{
            type:Date,
            default: Date.now()
        }
    }],
    voteCount:{
        type:Number,
        default:0
    }
    }
)

module.exports = mongoose.Model('candidate',candidateSchema);