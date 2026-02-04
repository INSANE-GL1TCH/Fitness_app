const router = require('express').Router();
const multer = require('multer');
const upload = multer();

const {registerUser,userLogin} = require("../controllers/userController");
const { verifyEmail } = require('../utlis/verifyEmail');

router.post("/registerUser", upload.none(), registerUser);
router.post("/userLogin",userLogin);
router.get('/verify-email', verifyEmail)

module.exports = router;