const SaveinnUserModel = require('../models/saveinn_user_model');

const SaveinnUserController = {};

SaveinnUserController.handleGetAllRows = async (req, res, next) => {
  const budgetMemberId = req.query.budgetMemberId;
  const result = await SaveinnUserModel.getAllRows(budgetMemberId);
  res.json(result);
}

SaveinnUserController.handleUsersInAllGroups = async (req, res, next) => {
  const result = await SaveinnUserModel.usersInAllGroups();
  res.json(result);
}

SaveinnUserController.handleGetRowById = async (req, res, next) => {
  const saveinnUserId = req.params.id;
  const result = await SaveinnUserModel.getRowById(saveinnUserId);
  res.json(result);
}

SaveinnUserController.handleInsertRow = async (req, res, next) => {
  const result = await SaveinnUserModel.insertRow(req.body);
  res.json(result);
}

SaveinnUserController.handleUpdateRowById = async (req, res, next) => {
  const saveinnUserId = req.params.id;
  const result = await SaveinnUserModel.updateRowById(saveinnUserId, req.body);
  res.json(result);
}

SaveinnUserController.handleUpdateEmail = async (req, res, next) => {
  const saveinnUserId = req.params.id;
  const result = await SaveinnUserModel.updateEmail(saveinnUserId, req.body);
  res.json(result);
}

SaveinnUserController.handleUpdateUsername = async (req, res, next) => {
  const saveinnUserId = req.params.id;
  const result = await SaveinnUserModel.updateUsername(saveinnUserId, req.body);
  res.json(result);
}

SaveinnUserController.handleUpdatePassword = async (req, res, next) => {
  const saveinnUserId = req.params.id;
  const result = await SaveinnUserModel.updatePassword(saveinnUserId, req.body);
  res.json(result);
}

SaveinnUserController.handleDeleteRowById = async (req, res, next) => {
  const saveinnUserId = req.params.id;
  const result = await SaveinnUserModel.deleteRowById(saveinnUserId);
  res.json(result);
}

SaveinnUserController.handleAuth = async (req, res, next) => {
  const result = await SaveinnUserModel.auth(req);
  res.json(result);
}

SaveinnUserController.handleSignIn = async (req, res, next) => {
  const result = await SaveinnUserModel.signIn(req, req.body);
  res.json(result);
}

SaveinnUserController.handleSignOut = async (req, res, next) => {
  const result = await SaveinnUserModel.signOut(req);
  res.json(result);
}

SaveinnUserController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = SaveinnUserController;
