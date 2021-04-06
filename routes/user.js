const express = require('express');
const router = express();
const userController = require('../controller/userController');
const authMiddleware = require('../middlewares/auth');
//router.use(authMiddleware)*/

router.post('/sign_up', userController.sign_up);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.show_users);
router.delete('/user', userController.delete_account);

module.exports = router;