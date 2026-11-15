const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');
const { auth } = require('../middleware/auth');

router.post('/', auth, participantController.addParticipant);
router.get('/', participantController.getParticipants);
router.delete('/:id', auth, participantController.deleteParticipant);

module.exports = router;
