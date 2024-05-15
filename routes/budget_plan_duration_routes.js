const express = require('express');
const BudgetPlanDurationController = require('../controllers/budget_plan_duration_controller');

const router = express.Router();

router.get('/', async (req, res) => console.log('budget_plan_duration_controller'));

module.exports = router;
