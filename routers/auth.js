const router = require('express').Router();
const {login,signup,id} = require('../controllers/authentication')
const authentication = require('../middleware/jsonWebToken')

router.post('/login',login);
router.post('/signup',signup);
router.get('/id',authentication.authToken,id)


module.exports = router;