const express = require('express');
const userController = require('../controllers/userController');
const { verify, verifyAdmin } = require('../auth');


const router = express.Router();

router.post('/', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/', verify, userController.userDetails);

router.put('/', verify, userController.updateUserDetails);


module.exports = router; 