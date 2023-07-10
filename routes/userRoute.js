const express = require('express');
const router = express.Router()
const userCTRL = require('../controllers/userController');

router.get('/allusers', userCTRL.allusers);
router.post('/login', userCTRL.login);
router.get('/userdetails/:id', userCTRL.userdetails);
router.post('/adduser', userCTRL.adduser)
router.get('/edituser/:id', userCTRL.edituser)
router.put('/updateuser/:id', userCTRL.updateuser)
router.delete('/deleteuser/:id', userCTRL.deleteuser)

module.exports = router;