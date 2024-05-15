const BudgetAssistantModel = require('../models/budget_assistant_model');

const BudgetAssistantController = {};

BudgetAssistantController.handleGetAllRows = async (req, res, next) => {
  const result = await BudgetAssistantModel.getAllRows();
  res.json(result);
}

BudgetAssistantController.handleGetRowById = async (req, res, next) => {
  const budgetAssistantId = req.params.id;
  const result = await BudgetAssistantModel.getRowById(budgetAssistantId);
  res.json(result);
}

BudgetAssistantController.handleInsertRow = async (req, res, next) => {
  const result = await BudgetAssistantModel.insertRow(req.body);
  res.json(result);
}

BudgetAssistantController.handleUpdateRowById = async (req, res, next) => {
  const budgetAssistantId = req.params.id;
  const result = await BudgetAssistantModel.updateRowById(budgetAssistantId, req.body);
  res.json(result);
}

// BudgetAssistantController.handleUpdateEmail = async (req, res, next) => {
//   const budgetAssistantId = req.params.id;
//   const result = await BudgetAssistantModel.updateEmail(budgetAssistantId, req.body);
//   res.json(result);
// }

// BudgetAssistantController.handleUpdateUsername = async (req, res, next) => {
//   const budgetAssistantId = req.params.id;
//   const result = await BudgetAssistantModel.updateUsername(budgetAssistantId, req.body);
//   res.json(result);
// }

// BudgetAssistantController.handleUpdatePassword = async (req, res, next) => {
//   const budgetAssistantId = req.params.id;
//   const result = await BudgetAssistantModel.updatePassword(budgetAssistantId, req.body);
//   res.json(result);
// }

BudgetAssistantController.handleDeleteRowById = async (req, res, next) => {
  const budgetAssistantId = req.params.id;
  const result = await BudgetAssistantModel.deleteRowById(budgetAssistantId);
  res.json(result);
}

BudgetAssistantController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = BudgetAssistantController;
