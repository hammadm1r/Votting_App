const user = require("../models/user");
const candidate = require('../models/candidate');
const setCandidate = async(req,res) => {
    try {
        const userId = req.params._id;
    const partyName = req.body.partyName;
    const existedCandidate = await candidate.findOne({ Candidate_Id: userId });
    if(existedCandidate){
        return res.status(400).json({message: "Candidate already exists."});
    }
    const newCandidate = new candidate;
    newCandidate.Candidate_Id = userId;
    newCandidate.partyName = partyName;
    await newCandidate.save()
    return res.status(200).json("Candidate Added");
    } catch (error) {
        return res.status(404).json(error);
    }   
}
const getCandidate = async(req,res) => {
    try {
        const all = await candidate.find();
        return res.status(200).json(all);
    } catch (error) {
        return res.status(404).json(error);
    }
}

const deleteCandidate = async(req,res) => {
    const candidateId = req.params._id; 
    try {
        const response = await candidate.deleteOne({ Candidate_Id: candidateId }).exec();
            if (response.deletedCount > 0) {
                res.status(200).json({ message: 'Candidate deleted successfully' });
            } else {
            res.status(404).json({ message: 'Candidate not found' });
            }
    } catch (error) {
        res.status(500).json({ message: error.message });
}
}

module.exports = {setCandidate,getCandidate,deleteCandidate};