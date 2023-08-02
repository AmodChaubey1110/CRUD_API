let express = require('express');
let router = express.Router();
const expressJwt = require('express-jwt');
const userController = require('../controllers/usersController');
const jwtMiddleware = require('../utils/jwtMiddleware')

router.post('/auth',userController.auth)
router.post('/create-user',userController.createUser)
router.get('/get-details',jwtMiddleware,userController.getDetails)


module.exports = router;
