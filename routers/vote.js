const router = require('express').Router();
const authentication = require('../middleware/jsonWebToken')
const {voteCandidate,candidateProfile,allCandidate} = require('../controllers/voterController');
const {checkVoter} = require('../middleware/checkVoter');

router.post("/:_id",authentication.authToken,checkVoter,voteCandidate);
router.get("/candidate/:_id",authentication.authToken,candidateProfile);
router.get("/candidate/",authentication.authToken,allCandidate);

module.exports = router;