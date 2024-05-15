const SpendExpenseModel = require('../models/spend_expense_model');

const SpendExpenseController = {};

SpendExpenseController.handleGetAllRows = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await SpendExpenseModel.getAllRows(saveinnUserId);
  res.json(result);
}

SpendExpenseController.handleSum = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await SpendExpenseModel.sum(saveinnUserId);
  res.json(result);
}

SpendExpenseController.handleAverageByCategory = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await SpendExpenseModel.averageByCategory(saveinnUserId);
  res.json(result);
}

SpendExpenseController.handleGetRowById = async (req, res, next) => {
  const spendExpenseId = req.params.id;
  const result = await SpendExpenseModel.getRowById(spendExpenseId);
  res.json(result);
}

SpendExpenseController.handleInsertRow = async (req, res, next) => {
  const result = await SpendExpenseModel.insertRow(req.body);
  res.json(result);
}

SpendExpenseController.handleUpdateRowById = async (req, res, next) => {
  const spendExpenseId = req.params.id;
  const result = await SpendExpenseModel.updateRowById(spendExpenseId, req.body);
  res.json(result);
}

SpendExpenseController.handleDeleteRowById = async (req, res, next) => {
  const spendExpenseId = req.params.id;
  const result = await SpendExpenseModel.deleteRowById(spendExpenseId);
  res.json(result);
}

SpendExpenseController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = SpendExpenseController;
