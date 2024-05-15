const express = require('express');
const BudgetGoalDurationController = require('../controllers/budget_goal_duration_controller');

const router = express.Router();

router.get('/', async (req, res) => console.log('budget_goal_duration_controller'));

module.exports = router;
