const UserGroupModel = require('../models/user_group_model');

const UserGroupController = {};

UserGroupController.handleGetAllRows = async (req, res, next) => {
  const result = await UserGroupModel.getAllRows();
  res.json(result);
}

UserGroupController.handleGetRowById = async (req, res, next) => {
  const userGroupId = req.params.id;
  const result = await UserGroupModel.getRowById(userGroupId);
  res.json(result);
}

UserGroupController.handleInsertRow = async (req, res, next) => {
  const result = await UserGroupModel.insertRow(req.body);
  res.json(result);
}

UserGroupController.handleUpdateRowById = async (req, res, next) => {
  const userGroupId = req.params.id;
  const result = await UserGroupModel.updateRowById(userGroupId, req.body);
  res.json(result);
}

UserGroupController.handleDeleteRowById = async (req, res, next) => {
  const userGroupId = req.params.id;
  const result = await UserGroupModel.deleteRowById(userGroupId);
  res.json(result);
}

UserGroupController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = UserGroupController;
