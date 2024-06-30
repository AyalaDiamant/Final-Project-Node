const express = require('express');
const meet = require('../controllers/meeting.controller');
const router = express.Router();
const bodyParser = require('body-parser');
const { isAdmin } = require('../middlewares/token.middelware');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * tags:
 *   name: Meetings
 *   description: Meetings management
 */

/**
 * @swagger
 * /meetings:
 *   get:
 *     summary: Get all meetings
 *     security:
 *       - bearerAuth: []
 *     tags: [Meetings]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/Meet', isAdmin, meet.getMeetings);

/**
 * @swagger
 * /meetings/{id}:
 *   get:
 *     summary: Get meeting by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/Meet/:id', isAdmin, meet.getMeetbyUserId);

/**
 * @swagger
 * /meetings:
 *   post:
 *     summary: Add a new meeting
 *     security:
 *       - bearerAuth: []
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *               date:
 *                 type: string
 *               place:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/Meet', isAdmin, meet.addMeet);

/**
 * @swagger
 * /meetings/{id}:
 *   put:
 *     summary: Update an existing meeting
 *     security:
 *       - bearerAuth: []
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The meeting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *               date:
 *                 type: string
 *               place:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/Meet/:id', isAdmin, meet.updatedMeet);

/**
 * @swagger
 * /meetings/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     security:
 *       - bearerAuth: []
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/Meet/:id', isAdmin, meet.deleteMeet);

module.exports = router;

