const router = require('express').Router();
const {login,signup,id,update} = require('../controllers/authentication')
const authentication = require('../middleware/jsonWebToken')

router.post('/login',login);
router.post('/signup',signup);
router.get('/id',authentication.authToken,id)
router.put('/update',authentication.authToken,update)


module.exports = router;