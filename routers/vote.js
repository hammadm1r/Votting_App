const router = require('express').Router();
const authentication = require('../middleware/jsonWebToken')
const {voteCandidate} = require('../controllers/voterController');
const {checkVoter} = require('../middleware/checkVoter');

router.post("/:_id",authentication.authToken,checkVoter,voteCandidate);

module.exports = router;