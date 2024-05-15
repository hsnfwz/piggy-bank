const express = require('express');
const UserBelongsToGroupController = require('../controllers/user_belongs_to_group_controller');

const router = express.Router();

router.get('/', UserBelongsToGroupController.handleGetAllRows);
router.get('/:userGroupId/:saveinnUserId', UserBelongsToGroupController.handleGetRowById);
router.post('/', UserBelongsToGroupController.handleInsertRow);
router.put('/:userGroupId/:saveinnUserId', UserBelongsToGroupController.handleUpdateRowById);
router.delete('/:userGroupId/:saveinnUserId', UserBelongsToGroupController.handleDeleteRowById);
router.all('*', UserBelongsToGroupController.handle404NotFound);

module.exports = router;
