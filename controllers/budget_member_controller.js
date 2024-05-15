const BudgetMemberModel = require('../models/budget_member_model');

const BudgetMemberController = {};

BudgetMemberController.handleGetAllRows = async (req, res, next) => {
  const result = await BudgetMemberModel.getAllRows();
  res.json(result);
}

BudgetMemberController.handleGetRowById = async (req, res, next) => {
  const budgetMemberId = req.params.id;
  const result = await BudgetMemberModel.getRowById(budgetMemberId);
  res.json(result);
}

BudgetMemberController.handleInsertRow = async (req, res, next) => {
  const result = await BudgetMemberModel.insertRow(req.body);
  res.json(result);
}

BudgetMemberController.handleUpdateRowById = async (req, res, next) => {
  const budgetMemberId = req.params.id;
  const result = await BudgetMemberModel.updateRowById(budgetMemberId, req.body);
  res.json(result);
}

// BudgetMemberController.handleUpdateEmail = async (req, res, next) => {
//   const budgetMemberId = req.params.id;
//   const result = await BudgetMemberModel.updateEmail(budgetMemberId, req.body);
//   res.json(result);
// }

// BudgetMemberController.handleUpdateUsername = async (req, res, next) => {
//   const budgetMemberId = req.params.id;
//   const result = await BudgetMemberModel.updateUsername(budgetMemberId, req.body);
//   res.json(result);
// }

// BudgetMemberController.handleUpdatePassword = async (req, res, next) => {
//   const budgetMemberId = req.params.id;
//   const result = await BudgetMemberModel.updatePassword(budgetMemberId, req.body);
//   res.json(result);
// }

BudgetMemberController.handleDeleteRowById = async (req, res, next) => {
  const budgetMemberId = req.params.id;
  const result = await BudgetMemberModel.deleteRowById(budgetMemberId);
  res.json(result);
}

BudgetMemberController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = BudgetMemberController;
