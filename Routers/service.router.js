const express = require('express');
const service = require('../Controllers/services.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/Service', service.getServices);
router.get('/Service/:id', service.getServiceId);
router.post('/Service', service.addService);
router.put('/Service/:id', service.updatedService);
router.delete('/Service/:id', service.deleteService);

module.exports = router;
