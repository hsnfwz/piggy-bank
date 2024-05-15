const express = require('express');
const PlanHasGoalController = require('../controllers/plan_has_goal_controller');

const router = express.Router();

router.get('/', PlanHasGoalController.handleGetAllRows);
router.get('/:planBudgetPlanId/:setBudgetGoalId', PlanHasGoalController.handleGetRowById);
router.post('/', PlanHasGoalController.handleInsertRow);
router.put('/:planBudgetPlanId/:setBudgetGoalId', PlanHasGoalController.handleUpdateRowById);
router.delete('/:planBudgetPlanId/:setBudgetGoalId', PlanHasGoalController.handleDeleteRowById);
router.all('*', PlanHasGoalController.handle404NotFound);

module.exports = router;
