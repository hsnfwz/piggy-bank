const express = require('express');
const BudgetAssistantController = require('../controllers/budget_assistant_controller');

const router = express.Router();

router.get('/', BudgetAssistantController.handleGetAllRows);
router.get('/:id', BudgetAssistantController.handleGetRowById);
router.post('/', BudgetAssistantController.handleInsertRow);
router.put('/:id', BudgetAssistantController.handleUpdateRowById);
// router.put('/update_email/:id', BudgetAssistantController.handleUpdateEmail);
// router.put('/update_username/:id', BudgetAssistantController.handleUpdateUsername);
// router.put('/update_password/:id', BudgetAssistantController.handleUpdatePassword);
router.delete('/:id', BudgetAssistantController.handleDeleteRowById);
router.all('*', BudgetAssistantController.handle404NotFound);

module.exports = router;
