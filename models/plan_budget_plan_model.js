const pool = require('../pg');

const PlanBudgetPlanModel = {};

PlanBudgetPlanModel.getAllRows = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT name, description, start_date AS "startDate", end_date AS "endDate", plan_budget_plan_id AS "planBudgetPlanId", saveinn_user_id AS "saveinnUserId" FROM plan_budget_plan WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT name, description, start_date AS "startDate", end_date AS "endDate", plan_budget_plan_id AS "planBudgetPlanId", saveinn_user_id AS "saveinnUserId" FROM plan_budget_plan';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanBudgetPlanModel.getRowById = async (planBudgetPlanId) => {
  try {
    const poolQuery = 'SELECT name, description, start_date AS "startDate", end_date AS "endDate", plan_budget_plan_id AS "planBudgetPlanId", saveinn_user_id AS "saveinnUserId" FROM plan_budget_plan WHERE plan_budget_plan_id=$1';
    const { rows } = await pool.query(poolQuery, [planBudgetPlanId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanBudgetPlanModel.insertRow = async (data) => {
  const {
    saveinnUserId,
    name,
    description,
    startDate,
    endDate,
  } = data;

  try {
    const poolQuery = 'INSERT INTO plan_budget_plan (saveinn_user_id, name, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5)';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, name, description, startDate, endDate]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanBudgetPlanModel.updateRowById = async (planBudgetPlanId, data) => {
  const {
    saveinnUserId,
    name,
    description,
    startDate,
    endDate,
  } = data;

  try {
    const poolQuery = 'UPDATE plan_budget_plan SET (saveinn_user_id, name, description, start_date, end_date) = ($1, $2, $3, $4, $5) WHERE plan_budget_plan_id=$6';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, name, description, startDate, endDate, planBudgetPlanId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

PlanBudgetPlanModel.deleteRowById = async (planBudgetPlanId) => {
  try {
    const poolQuery = 'DELETE FROM plan_budget_plan WHERE plan_budget_plan_id=$1';
    const { rows } = await pool.query(poolQuery, [planBudgetPlanId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = PlanBudgetPlanModel;
