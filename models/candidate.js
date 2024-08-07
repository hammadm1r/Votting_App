const mongoose = require('mongoose');
const User = require('./user')
const candidateSchema = new mongoose.Schema({
    Candidate_Id :{
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
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
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

module.exports = mongoose.model('candidate',candidateSchema);