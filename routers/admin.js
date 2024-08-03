const router = require('express').Router();
const authentication = require('../middleware/jsonWebToken')
const checkAdmin = require('../middleware/checkAdmin');
const setCandidate = require("../controllers/adminController")

router.post("/candidate/:_id",authentication.authToken,checkAdmin,setCandidate);



module.exports = router;