const express = require('express');
const login = require('../Controllers/login.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/Logout', login.logout);
router.post('/Login', login.login);

module.exports = router;
