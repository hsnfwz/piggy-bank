const pool = require('../pg');

const PlanHasGoalModel = {};

PlanHasGoalModel.getAllRows = async (planBudgetPlanId, setBudgetGoalId) => {
  try {
    let rows = [];

    if (setBudgetGoalId) {
      const poolQuery = 'SELECT plan_has_goal.plan_budget_plan_id AS "planBudgetPlanId", plan_has_goal.set_budget_goal_id AS "setBudgetGoalId", set_budget_goal.start_date AS "startDate", set_budget_goal.end_date AS "endDate", set_budget_goal.amount_saved AS "amountSaved", set_budget_goal.name, set_budget_goal.description, set_budget_goal.saveinn_user_id AS "saveinnUserId" FROM plan_has_goal INNER JOIN set_budget_goal ON plan_has_goal.set_budget_goal_id=set_budget_goal.set_budget_goal_id WHERE plan_has_goal.set_budget_goal_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [setBudgetGoalId]);
      rows = _rows;
    } else if (planBudgetPlanId) {
      const poolQuery = 'SELECT plan_has_goal.plan_budget_plan_id AS "planBudgetPlanId", plan_has_goal.set_budget_goal_id AS "setBudgetGoalId", set_budget_goal.start_date AS "startDate", set_budget_goal.end_date AS "endDate", set_budget_goal.amount_saved AS "amountSaved", set_budget_goal.name, set_budget_goal.description, set_budget_goal.saveinn_user_id AS "saveinnUserId" FROM plan_has_goal INNER JOIN set_budget_goal ON plan_has_goal.set_budget_goal_id=set_budget_goal.set_budget_goal_id WHERE plan_has_goal.plan_budget_plan_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [planBudgetPlanId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT plan_budget_plan_id AS "planBudgetPlanId", set_budget_goal_id AS "setBudgetGoalId" FROM plan_has_goal';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanHasGoalModel.getRowById = async (planBudgetPlanId, setBudgetGoalId) => {
  try {
    const poolQuery = 'SELECT plan_budget_plan_id AS "planBudgetPlanId", set_budget_goal_id AS "setBudgetGoalId" FROM plan_has_goal WHERE plan_budget_plan_id=$1 AND set_budget_goal_id=$2';
    const { rows } = await pool.query(poolQuery, [planBudgetPlanId, setBudgetGoalId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanHasGoalModel.insertRow = async (data) => {
  const {
    planBudgetPlanId,
    setBudgetGoalId,
  } = data;

  try {
    const poolQuery = 'INSERT INTO plan_has_goal (plan_budget_plan_id, set_budget_goal_id) VALUES ($1, $2)';
    const { rows } = await pool.query(poolQuery, [planBudgetPlanId, setBudgetGoalId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanHasGoalModel.updateRowById = async (planBudgetPlanId, setBudgetGoalId, data) => {
  // ...
}

PlanHasGoalModel.deleteRowById = async (planBudgetPlanId, setBudgetGoalId) => {
  try {
    const poolQuery = 'DELETE FROM plan_has_goal WHERE plan_budget_plan_id=$1 AND set_budget_goal_id=$2';
    const { rows } = await pool.query(poolQuery, [planBudgetPlanId, setBudgetGoalId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = PlanHasGoalModel;
