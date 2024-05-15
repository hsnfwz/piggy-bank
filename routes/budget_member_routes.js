const express = require('express');
const BudgetMemberController = require('../controllers/budget_member_controller');

const router = express.Router();

router.get('/', BudgetMemberController.handleGetAllRows);
router.get('/:id', BudgetMemberController.handleGetRowById);
router.post('/', BudgetMemberController.handleInsertRow);
router.put('/:id', BudgetMemberController.handleUpdateRowById);
// router.put('/update_email/:id', BudgetMemberController.handleUpdateEmail);
// router.put('/update_username/:id', BudgetMemberController.handleUpdateUsername);
// router.put('/update_password/:id', BudgetMemberController.handleUpdatePassword);
router.delete('/:id', BudgetMemberController.handleDeleteRowById);
router.all('*', BudgetMemberController.handle404NotFound);

module.exports = router;
