const express = require('express');
const UserGroupController = require('../controllers/user_group_controller');

const router = express.Router();

router.get('/', UserGroupController.handleGetAllRows);
router.get('/:id', UserGroupController.handleGetRowById);
router.post('/', UserGroupController.handleInsertRow);
router.put('/:id', UserGroupController.handleUpdateRowById);
router.delete('/:id', UserGroupController.handleDeleteRowById);
router.all('*', UserGroupController.handle404NotFound);

module.exports = router;
