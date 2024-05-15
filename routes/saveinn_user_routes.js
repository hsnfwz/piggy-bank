const express = require('express');
const SaveinnUserController = require('../controllers/saveinn_user_controller');

const router = express.Router();

router.get('/', SaveinnUserController.handleGetAllRows);
router.get('/user/users_in_all_groups', SaveinnUserController.handleUsersInAllGroups);
router.get('/user/auth', SaveinnUserController.handleAuth);
router.get('/:id', SaveinnUserController.handleGetRowById);
router.post('/', SaveinnUserController.handleInsertRow);
router.post('/user/sign_in', SaveinnUserController.handleSignIn);
router.put('/:id', SaveinnUserController.handleUpdateRowById);
router.put('/update_email/:id', SaveinnUserController.handleUpdateEmail);
router.put('/update_username/:id', SaveinnUserController.handleUpdateUsername);
router.put('/update_password/:id', SaveinnUserController.handleUpdatePassword);
router.delete('/user/sign_out', SaveinnUserController.handleSignOut);
router.delete('/:id', SaveinnUserController.handleDeleteRowById);
router.all('*', SaveinnUserController.handle404NotFound);

module.exports = router;
