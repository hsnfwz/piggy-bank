const AskQuestionModel = require('../models/ask_question_model');

const AskQuestionController = {};

AskQuestionController.handleGetAllRows = async (req, res, next) => {
  const saveinnUserId = req.query.saveinnUserId;
  const result = await AskQuestionModel.getAllRows(saveinnUserId);
  res.json(result);
}

AskQuestionController.handleGetRowById = async (req, res, next) => {
  const askQuestionId = req.params.id;
  const result = await AskQuestionModel.getRowById(askQuestionId);
  res.json(result);
}

AskQuestionController.handleInsertRow = async (req, res, next) => {
  const result = await AskQuestionModel.insertRow(req.body);
  res.json(result);
}

AskQuestionController.handleUpdateRowById = async (req, res, next) => {
  const askQuestionId = req.params.id;
  const result = await AskQuestionModel.updateRowById(askQuestionId, req.body);
  res.json(result);
}

AskQuestionController.handleDeleteRowById = async (req, res, next) => {
  const askQuestionId = req.params.id;
  const result = await AskQuestionModel.deleteRowById(askQuestionId);
  res.json(result);
}

AskQuestionController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = AskQuestionController;
