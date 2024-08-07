const router = require('express').Router();
const authentication = require('../middleware/jsonWebToken')
const {checkAdmin} = require('../middleware/checkAdmin');
const {setCandidate,getCandidate,deleteCandidate} = require("../controllers/adminController")

router.post("/candidate/:_id",authentication.authToken,checkAdmin,setCandidate);
router.get("/getcandidate",authentication.authToken,checkAdmin,getCandidate);
router.delete("/deleteCandidate/:_id",authentication.authToken,checkAdmin,deleteCandidate);

module.exports = router;