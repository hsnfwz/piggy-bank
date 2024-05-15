const PlanBudgetPlanModel = require('../models/plan_budget_plan_model');

const PlanBudgetPlanController = {};

PlanBudgetPlanController.handleGetAllRows = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await PlanBudgetPlanModel.getAllRows(saveinnUserId);
  res.json(result);
}

PlanBudgetPlanController.handleGetRowById = async (req, res, next) => {
  const planBudgetPlanId = req.params.id;
  const result = await PlanBudgetPlanModel.getRowById(planBudgetPlanId);
  res.json(result);
}

PlanBudgetPlanController.handleInsertRow = async (req, res, next) => {
  const result = await PlanBudgetPlanModel.insertRow(req.body);
  res.json(result);
}

PlanBudgetPlanController.handleUpdateRowById = async (req, res, next) => {
  const planBudgetPlanId = req.params.id;
  const result = await PlanBudgetPlanModel.updateRowById(planBudgetPlanId, req.body);
  res.json(result);
}

PlanBudgetPlanController.handleDeleteRowById = async (req, res, next) => {
  const planBudgetPlanId = req.params.id;
  const result = await PlanBudgetPlanModel.deleteRowById(planBudgetPlanId);
  res.json(result);
}

PlanBudgetPlanController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = PlanBudgetPlanController;
