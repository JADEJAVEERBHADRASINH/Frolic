const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize(['Admin']), instituteController.createInstitute);
router.get('/', instituteController.getInstitutes);
router.get('/:id', instituteController.getInstitute);
router.put('/:id', auth, authorize(['Admin']), instituteController.updateInstitute);
router.delete('/:id', auth, authorize(['Admin']), instituteController.deleteInstitute);

module.exports = router;
