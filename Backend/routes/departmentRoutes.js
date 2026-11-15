const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize(['Admin', 'Coordinator']), departmentController.createDepartment);
router.get('/', departmentController.getDepartments);
router.get('/:id', departmentController.getDepartment);
router.put('/:id', auth, authorize(['Admin', 'Coordinator']), departmentController.updateDepartment);
router.delete('/:id', auth, authorize(['Admin', 'Coordinator']), departmentController.deleteDepartment);

module.exports = router;
