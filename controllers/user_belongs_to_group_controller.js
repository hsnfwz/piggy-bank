const UserBelongsToGroupModel = require('../models/user_belongs_to_group_model');

const UserBelongsToGroupController = {};

UserBelongsToGroupController.handleGetAllRows = async (req, res, next) => {
  const userGroupId = req.query.userGroupId;
  const saveinnUserId = req.query.saveinnUserId;
  const result = await UserBelongsToGroupModel.getAllRows(userGroupId, saveinnUserId);
  res.json(result);
}

UserBelongsToGroupController.handleGetRowById = async (req, res, next) => {
  const userGroupId = req.params.userGroupId;
  const saveinnUserId = req.params.saveinnUserId;
  const result = await UserBelongsToGroupModel.getRowById(userGroupId, saveinnUserId);
  res.json(result);
}

UserBelongsToGroupController.handleInsertRow = async (req, res, next) => {
  const result = await UserBelongsToGroupModel.insertRow(req.body);
  res.json(result);
}

UserBelongsToGroupController.handleUpdateRowById = async (req, res, next) => {
  const userGroupId = req.params.userGroupId;
  const saveinnUserId = req.params.saveinnUserId;
  const result = await UserBelongsToGroupModel.updateRowById(userGroupId, saveinnUserId, req.body);
  res.json(result);
}

UserBelongsToGroupController.handleDeleteRowById = async (req, res, next) => {
  const userGroupId = req.params.userGroupId;
  const saveinnUserId = req.params.saveinnUserId;
  const result = await UserBelongsToGroupModel.deleteRowById(userGroupId, saveinnUserId);
  res.json(result);
}

UserBelongsToGroupController.handle404NotFound = async (req, res, next) => {
  res.json({ rows: [], message: '404 Not Found' });
}

module.exports = UserBelongsToGroupController;
