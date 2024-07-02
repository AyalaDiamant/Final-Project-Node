const express = require('express');
const service = require('../controllers/services.controller');
const router = express.Router();
const bodyParser = require('body-parser');
const { checkIsAdmin } = require('../middlewares/token.middelware');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
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
router.get('/Service', service.getServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/Service/:id', service.getServiceId);

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Add a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/Service', checkIsAdmin, service.addService);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update an existing service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/Service/:id', checkIsAdmin, service.updatedService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/Service/:id', checkIsAdmin, service.deleteService);
module.exports = router;
