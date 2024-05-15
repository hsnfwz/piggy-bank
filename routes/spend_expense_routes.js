const express = require('express');
const SpendExpenseController = require('../controllers/spend_expense_controller');

const router = express.Router();

router.get('/', SpendExpenseController.handleGetAllRows);
router.get('/sum', SpendExpenseController.handleSum);
router.get('/average_by_category', SpendExpenseController.handleAverageByCategory);
router.get('/:id', SpendExpenseController.handleGetRowById);
router.post('/', SpendExpenseController.handleInsertRow);
router.put('/:id', SpendExpenseController.handleUpdateRowById);
router.delete('/:id', SpendExpenseController.handleDeleteRowById);
router.all('*', SpendExpenseController.handle404NotFound);

module.exports = router;