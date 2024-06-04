const express = require('express');
const user = require('../Controllers/users.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/User', user.getUsers);
router.get('/User/:id', user.getUserId);
router.post('/User', user.addUser);
router.put('/User/:id', user.updatedUser);
router.delete('/User/:id', user.deleteUser);

module.exports = router;
