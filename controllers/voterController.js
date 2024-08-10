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
const candidateProfile = async(req,res) => {
    try {
        const Candidate_id= req.params._id;
    const Candidate_Profile =await candidate.findOne({Candidate_Id:Candidate_id});
    if(!Candidate_Profile){
        return res.status(404).json({message:"Candidate not found"})
    }
    return res.status(200).json(Candidate_Profile);
    } catch (error) {
        return res.status(400).json(error);
    }
}
const allCandidate = async(req,res) => {
        try {
            const allCandidate = await candidate.find();
            return res.status(200).json(allCandidate);
        } catch (error) {
            return res.status(400).json(error);
        }
}
module.exports = {voteCandidate,candidateProfile,allCandidate};