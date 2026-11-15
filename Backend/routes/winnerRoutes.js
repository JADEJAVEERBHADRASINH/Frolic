const express = require('express');
const router = express.Router();
const winnerController = require('../controllers/winnerController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize(['Admin', 'Coordinator']), winnerController.assignWinner);
router.get('/', winnerController.getWinners);
router.delete('/:id', auth, authorize(['Admin', 'Coordinator']), winnerController.deleteWinner);

module.exports = router;
