const user = require("../models/user");
const candidate = require('../models/candidate');
const setCandidate = async (req, res) => {
    try {
        const userId = req.params._id;
    const partyName = req.body.partyName;
    const existedCandidate = candidate.findOne({_id:userId});
    if(existedCandidate){
        return res.status(400).json({message: "Candidate already exists."});
    }
    const newCandidate = new candidate;
    newCandidate._id = userId;
    newCandidate.partyName = partyName;
    return res.status(200).json("Candidate Added");
    } catch (error) {
        return res.status(404).json(error);
    }
    
}

module.exports = {setCandidate};