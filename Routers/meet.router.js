const express = require('express');
const meet = require('../Controllers/meeting.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/Meet', meet.getMeetings);
router.get('/Meet/:id', meet.getMeetId);
router.post('/Meet', meet.addMeet);
router.put('/Meet/:id', meet.updatedMeet);
router.delete('/Meet/:id', meet.deleteMeet);

module.exports = router;
