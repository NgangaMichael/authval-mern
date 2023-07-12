const express = require('express');
const router = express.Router()
const userCTRL = require('../controllers/userController');

router.get('/allusers', userCTRL.allusers);
router.get('/profile', userCTRL.userdetails);
router.put('/updateuserdetails/:id', userCTRL.edituserdetails);
router.post('/login', userCTRL.login);
router.post('/adduser', userCTRL.adduser)
router.get('/edituser/:id', userCTRL.edituser)
router.put('/updateuser/:id', userCTRL.updateuser)
router.delete('/deleteuser/:id', userCTRL.deleteuser)

module.exports = router;