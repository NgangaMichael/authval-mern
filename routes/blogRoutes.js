const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogCTRL = require('../controllers/blogContoller');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage,
    limits: {fieldSize: 1040 * 1040 * 3}
}).single('image');

router.get('/allblogs', blogCTRL.allblogs);
router.post('/addblog', upload, blogCTRL.addblog);
router.get('/editblog/:id', blogCTRL.editblog);
router.put('/updateblog/:id', upload, blogCTRL.updateblog)
router.get('/details/:id', blogCTRL.details);
router.delete('/deleteblog/:id', blogCTRL.delete);

module.exports = router;