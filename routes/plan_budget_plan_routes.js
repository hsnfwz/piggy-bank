const express = require('express');
const PlanBudgetPlanController = require('../controllers/plan_budget_plan_controller');

const router = express.Router();

router.get('/', PlanBudgetPlanController.handleGetAllRows);
router.get('/:id', PlanBudgetPlanController.handleGetRowById);
router.post('/', PlanBudgetPlanController.handleInsertRow);
router.put('/:id', PlanBudgetPlanController.handleUpdateRowById);
router.delete('/:id', PlanBudgetPlanController.handleDeleteRowById);
router.all('*', PlanBudgetPlanController.handle404NotFound);

module.exports = router;
