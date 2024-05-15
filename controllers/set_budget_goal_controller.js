const SetBudgetGoalModel = require('../models/set_budget_goal_model');

const SetBudgetGoalController = {};

SetBudgetGoalController.handleGetAllRows = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await SetBudgetGoalModel.getAllRows(saveinnUserId);
  res.json(result);
}

SetBudgetGoalController.handleGetRowById = async (req, res, next) => {
  const setBudgetGoalId = req.params.id;
  const result = await SetBudgetGoalModel.getRowById(setBudgetGoalId);
  res.json(result);
}

SetBudgetGoalController.handleInsertRow = async (req, res, next) => {
  const result = await SetBudgetGoalModel.insertRow(req.body);
  res.json(result);
}

SetBudgetGoalController.handleUpdateRowById = async (req, res, next) => {
  const setBudgetGoalId = req.params.id;
  const result = await SetBudgetGoalModel.updateRowById(setBudgetGoalId, req.body);
  res.json(result);
}

SetBudgetGoalController.handleDeleteRowById = async (req, res, next) => {
  const setBudgetGoalId = req.params.id;
  const result = await SetBudgetGoalModel.deleteRowById(setBudgetGoalId);
  res.json(result);
}

SetBudgetGoalController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = SetBudgetGoalController;
