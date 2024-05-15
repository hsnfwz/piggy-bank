const AnswerModel = require('../models/answer_model');

const AnswerController = {};

AnswerController.handleGetAllRows = async (req, res, next) => {
  const askQuestionId = req.query.askQuestionId;
  const result = await AnswerModel.getAllRows(askQuestionId);
  res.json(result);
}

AnswerController.handleGetRowById = async (req, res, next) => {
  const answerId = req.params.id;
  const result = await AnswerModel.getRowById(answerId);
  res.json(result);
}

AnswerController.handleInsertRow = async (req, res, next) => {
  const result = await AnswerModel.insertRow(req.body);
  res.json(result);
}

AnswerController.handleUpdateRowById = async (req, res, next) => {
  const answerId = req.params.id;
  const result = await AnswerModel.updateRowById(answerId, req.body);
  res.json(result);
}

AnswerController.handleDeleteRowById = async (req, res, next) => {
  const answerId = req.params.id;
  const result = await AnswerModel.deleteRowById(answerId);
  res.json(result);
}

AnswerController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = AnswerController;
