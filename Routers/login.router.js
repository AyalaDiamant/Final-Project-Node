const express = require('express');
const login = require('../controllers/login.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Authentication
 */

/**
 * @swagger
 * /Logout:
 *   get:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get('/Logout', login.logout);


/**
 * @swagger
 * /Login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Unauthorized
 */
router.post('/Login', login.login);

router.post('/register', login.register);

module.exports = router;
