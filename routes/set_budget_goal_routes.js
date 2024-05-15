const express = require('express');
const SetBudgetGoalController = require('../controllers/set_budget_goal_controller');

const router = express.Router();

router.get('/', SetBudgetGoalController.handleGetAllRows);
router.get('/:id', SetBudgetGoalController.handleGetRowById);
router.post('/', SetBudgetGoalController.handleInsertRow);
router.put('/:id', SetBudgetGoalController.handleUpdateRowById);
router.delete('/:id', SetBudgetGoalController.handleDeleteRowById);
router.all('*', SetBudgetGoalController.handle404NotFound);

module.exports = router;
