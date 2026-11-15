const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize(['Admin', 'Coordinator']), eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.put('/:id', auth, authorize(['Admin', 'Coordinator']), eventController.updateEvent);
router.delete('/:id', auth, authorize(['Admin', 'Coordinator']), eventController.deleteEvent);

module.exports = router;
