const user = require("../models/user");
const candidate = require('../models/candidate');
const voteCandidate = async(req,res) => {
    try {
        const CandidateId = req.params._id;
    const userId = req.user;
    const voteTo =await candidate.findOne({Candidate_Id:CandidateId})
    if(!voteTo){
        return res.status(404).json({message:"Candidate not found"})
    }
    if (!voteTo.votes.includes(userId)){
        return res.status(400).json({message:"You have already voted for this candidate"});
    }
    voteTo.votes.push(userId);
    voteTo.voteCount = voteTo.voteCount + 1;
    await voteTo.save();
    return res.status(200).json("Voted");
    } catch (error) {
        return res.status(400).json(error);  
    }

    
}
module.exports = {voteCandidate};