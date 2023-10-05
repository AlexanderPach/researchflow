const { createUsers, loginUser } = require('../controller/userController');
const router = require('express').Router();


/*
@API /user routes
*/
router.post('/signup', createUsers);
router.post('/login', loginUser)


module.exports = router;