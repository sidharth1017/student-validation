const router = require('express').Router();
const emailController = require("./controllers/email-controller");
const phoneController = require("./controllers/phone-controller");
 
router.post('/api/signup', emailController.signup);
router.post('/api/validate-email', emailController.validateEmail);
router.post('/api/phone', phoneController.userNumber);
router.post('/api/validate-phone', phoneController.validateNumber);



module.exports = router;

