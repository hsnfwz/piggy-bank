const pool = require('../pg');

const BudgetMemberModel = {};

BudgetMemberModel.getAllRows = async () => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", employment_position AS "employmentPosition", postal_code AS "postalCode", budget_member_id AS "budgetMemberId" FROM budget_member';
    const { rows } = await pool.query(poolQuery);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.getRowById = async (budgetMemberId) => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", employment_position AS "employmentPosition", postal_code AS "postalCode", budget_member_id AS "budgetMemberId" FROM budget_member WHERE budget_member_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetMemberId]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.insertRow = async (data) => {
  const {
    firstName,
    lastName,
    employmentPosition,
    postalCode,
  } = data;

  try {  
    const poolQuery = 'INSERT INTO budget_member (first_name, last_name, employment_position, postal_code) VALUES ($1, $2, $3, $4) RETURNING budget_member_id AS "budgetMemberId"';
    const { rows } = await pool.query(poolQuery, [firstName, lastName, employmentPosition, postalCode]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.updateRowById = async (budgetMemberId, data) => {
  const {
    firstName,
    lastName,
    employmentPosition,
    postalCode,
  } = data;

  try {  
    const poolQuery = 'UPDATE budget_member SET (first_name, last_name, employment_position, postal_code) = ($1, $2, $3, $4) WHERE budget_member_id=$5';
    const { rows } = await pool.query(poolQuery, [firstName, lastName, employmentPosition, postalCode, budgetMemberId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetMemberModel.deleteRowById = async (budgetMemberId) => {
  try {
    const poolQuery = 'DELETE FROM budget_member WHERE budget_member_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetMemberId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = BudgetMemberModel;
