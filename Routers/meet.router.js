const express = require('express');
const meet = require('../Controllers/meeting.controller');
const router = express.Router();
const bodyParser = require('body-parser');

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
 * /Meet:
 *   get:
 *     summary: Get all meetings
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
router.get('/Meet', meet.getMeetings);

/**
 * @swagger
 * /Meet/{id}:
 *   get:
 *     summary: Get meeting by ID
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
router.get('/Meet/:id', meet.getMeetId);

/**
 * @swagger
 * /Meet:
 *   post:
 *     summary: Add a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/Meet', meet.addMeet);

/**
 * @swagger
 * /Meet/{id}:
 *   put:
 *     summary: Update an existing meeting
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
 *               title:
 *                 type: string
 *               date:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/Meet/:id', meet.updatedMeet);

/**
 * @swagger
 * /Meet/{id}:
 *   delete:
 *     summary: Delete a meeting
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
router.delete('/Meet/:id', meet.deleteMeet);

module.exports = router;

