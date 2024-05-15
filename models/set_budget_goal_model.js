const pool = require('../pg');

const SetBudgetGoalModel = {};

SetBudgetGoalModel.getAllRows = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT name, description, amount_saved AS "amountSaved", start_date AS "startDate", end_date AS "endDate", set_budget_goal_id AS "setBudgetGoalId", saveinn_user_id AS "saveinnUserId" FROM set_budget_goal WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT name, description, amount_saved AS "amountSaved", start_date AS "startDate", end_date AS "endDate", set_budget_goal_id AS "setBudgetGoalId", saveinn_user_id AS "saveinnUserId" FROM set_budget_goal';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SetBudgetGoalModel.getRowById = async (setBudgetGoalId) => {
  try {
    const poolQuery = 'SELECT name, description, amount_saved AS "amountSaved", start_date AS "startDate", end_date AS "endDate", set_budget_goal_id AS "setBudgetGoalId", saveinn_user_id AS "saveinnUserId" FROM set_budget_goal WHERE set_budget_goal_id=$1';
    const { rows } = await pool.query(poolQuery, [setBudgetGoalId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SetBudgetGoalModel.insertRow = async (data) => {
  const {
    saveinnUserId,
    name,
    description,
    startDate,
    endDate,
    amountSaved,
  } = data;

  try {
    const poolQuery = 'INSERT INTO set_budget_goal (saveinn_user_id, name, description, start_date, end_date, amount_saved) VALUES ($1, $2, $3, $4, $5, $6) RETURNING set_budget_goal_id AS "setBudgetGoalId"';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, name, description, startDate, endDate, amountSaved]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SetBudgetGoalModel.updateRowById = async (setBudgetGoalId, data) => {
  const {
    saveinnUserId,
    name,
    description,
    startDate,
    endDate,
    amountSaved,
  } = data;

  try {
    const poolQuery = 'UPDATE set_budget_goal SET (saveinn_user_id, name, description, start_date, end_date, amount_saved) = ($1, $2, $3, $4, $5, $6) WHERE set_budget_goal_id=$7';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, name, description, startDate, endDate, amountSaved, setBudgetGoalId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SetBudgetGoalModel.deleteRowById = async (setBudgetGoalId) => {
  try {
    const poolQuery = 'DELETE FROM set_budget_goal WHERE set_budget_goal_id=$1';
    const { rows } = await pool.query(poolQuery, [setBudgetGoalId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = SetBudgetGoalModel;
