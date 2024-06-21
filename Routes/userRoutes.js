const express = require('express');
const { getAllUsers, registerController, loginCOntroller } = require('../Controllers/userController');


const router = express.Router();

//get all user router http://localhost:2914/api/user/get-all-users
router.get('/get-all-users',getAllUsers)

//user register routes http://localhost:2914/api/user/register
router.post('/register',registerController)

//user login routes
router.post('/login',loginCOntroller)

module.exports = router
