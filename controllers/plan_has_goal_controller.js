const PlanHasGoalModel = require('../models/plan_has_goal_model');

const PlanHasGoalController = {};

PlanHasGoalController.handleGetAllRows = async (req, res, next) => {
  const planBudgetPlanId = req.query.planBudgetPlanId;
  const setBudgetGoalId = req.query.setBudgetGoalId;
  const result = await PlanHasGoalModel.getAllRows(planBudgetPlanId, setBudgetGoalId);
  res.json(result);
}

PlanHasGoalController.handleGetRowById = async (req, res, next) => {
  const planBudgetPlanId = req.params.planBudgetPlanId;
  const setBudgetGoalId = req.params.setBudgetGoalId;
  const result = await PlanHasGoalModel.getRowById(planBudgetPlanId, setBudgetGoalId);
  res.json(result);
}

PlanHasGoalController.handleInsertRow = async (req, res, next) => {
  const result = await PlanHasGoalModel.insertRow(req.body);
  res.json(result);
}

PlanHasGoalController.handleUpdateRowById = async (req, res, next) => {
  const planBudgetPlanId = req.params.planBudgetPlanId;
  const setBudgetGoalId = req.params.setBudgetGoalId;
  const result = await PlanHasGoalModel.updateRowById(planBudgetPlanId, setBudgetGoalId, req.body);
  res.json(result);
}

PlanHasGoalController.handleDeleteRowById = async (req, res, next) => {
  const planBudgetPlanId = req.params.planBudgetPlanId;
  const setBudgetGoalId = req.params.setBudgetGoalId;
  const result = await PlanHasGoalModel.deleteRowById(planBudgetPlanId, setBudgetGoalId);
  res.json(result);
}

PlanHasGoalController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = PlanHasGoalController;
