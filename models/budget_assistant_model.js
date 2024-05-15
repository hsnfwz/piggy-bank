const pool = require('../pg');

const BudgetAssistantModel = {};

BudgetAssistantModel.getAllRows = async () => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", area_of_expertise AS "areaOfExpertise", postal_code AS "postalCode", years_of_experience AS "yearsOfExperience", budget_assistant_id AS "budgetAssistantId" FROM budget_assistant';
    const { rows } = await pool.query(poolQuery);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.getRowById = async (budgetAssistantId) => {
  try {
    const poolQuery = 'SELECT first_name AS "firstName", last_name AS "lastName", area_of_expertise AS "areaOfExpertise", postal_code AS "postalCode", years_of_experience AS "yearsOfExperience", budget_assistant_id AS "budgetAssistantId" FROM budget_assistant WHERE budget_assistant_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.insertRow = async (data) => {
  const {
    firstName,
    lastName,
    areaOfExpertise,
    postalCode,
    yearsOfExperience,
  } = data;

  try {
    const poolQuery = 'INSERT INTO budget_assistant (first_name, last_name, area_of_expertise, postal_code, years_of_experience) VALUES ($1, $2, $3, $4, $5) RETURNING budget_assistant_id AS "budgetAssistantId"';
    const { rows } = await pool.query(poolQuery, [firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.updateRowById = async (budgetAssistantId, data) => {
  const {
    firstName,
    lastName,
    areaOfExpertise,
    postalCode,
    yearsOfExperience
  } = data;

  try {  
    const poolQuery = 'UPDATE budget_assistant SET (first_name, last_name, area_of_expertise, postal_code, years_of_experience) = ($1, $2, $3, $4, $5) WHERE budget_assistant_id=$6';
    const { rows } = await pool.query(poolQuery, [firstName, lastName, areaOfExpertise, postalCode, yearsOfExperience, budgetAssistantId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

BudgetAssistantModel.deleteRowById = async (budgetAssistantId) => {
  try {
    const poolQuery = 'DELETE FROM budget_assistant WHERE budget_assistant_id=$1';
    const { rows } = await pool.query(poolQuery, [budgetAssistantId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = BudgetAssistantModel;
