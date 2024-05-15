const EarnIncomeModel = require('../models/earn_income_model');

const EarnIncomeController = {};

EarnIncomeController.handleGetAllRows = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await EarnIncomeModel.getAllRows(saveinnUserId);
  res.json(result);
}

EarnIncomeController.handleSum = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await EarnIncomeModel.sum(saveinnUserId);
  res.json(result);
}

EarnIncomeController.handleAverageByCategory = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await EarnIncomeModel.averageByCategory(saveinnUserId);
  res.json(result);
}

EarnIncomeController.handleGetRowById = async (req, res, next) => {
  const earnIncomeId = req.params.id;
  const result = await EarnIncomeModel.getRowById(earnIncomeId);
  res.json(result);
}

EarnIncomeController.handleInsertRow = async (req, res, next) => {
  const result = await EarnIncomeModel.insertRow(req.body);
  res.json(result);
}

EarnIncomeController.handleUpdateRowById = async (req, res, next) => {
  const earnIncomeId = req.params.id;
  const result = await EarnIncomeModel.updateRowById(earnIncomeId, req.body);
  res.json(result);
}

EarnIncomeController.handleDeleteRowById = async (req, res, next) => {
  const earnIncomeId = req.params.id;
  const result = await EarnIncomeModel.deleteRowById(earnIncomeId);
  res.json(result);
}

EarnIncomeController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = EarnIncomeController;
