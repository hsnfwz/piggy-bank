const pool = require('../pg');

const EarnIncomeModel = {};

EarnIncomeModel.getAllRows = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT title, description, category, amount, earn_income_id AS "earnIncomeId" FROM earn_income WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT title, description, category, amount, earn_income_id AS "earnIncomeId" FROM earn_income';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.sum = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT SUM(amount) FROM earn_income WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    }
  
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.averageByCategory = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT AVG(amount), category FROM earn_income WHERE saveinn_user_id=$1 GROUP BY category';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.getRowById = async (earnIncomeId) => {
  try {
    const poolQuery = 'SELECT title, description, category, amount, earn_income_id AS "earnIncomeId" FROM earn_income WHERE earn_income_id=$1';
    const { rows } = await pool.query(poolQuery, [earnIncomeId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.insertRow = async (data) => {
  const {
    saveinnUserId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'INSERT INTO earn_income (saveinn_user_id, amount, title, description, category) VALUES ($1, $2, $3, $4, $5)';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, amount, title, description, category]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.updateRowById = async (earnIncomeId, data) => {
  const {
    saveinnUserId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'UPDATE earn_income SET (saveinn_user_id, amount, title, description, category) = ($1, $2, $3, $4, $5) WHERE earn_income_id=$6';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, amount, title, description, category, earnIncomeId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

EarnIncomeModel.deleteRowById = async (earnIncomeId) => {
  try {
    const poolQuery = 'DELETE FROM earn_income WHERE earn_income_id=$1';
    const { rows } = await pool.query(poolQuery, [earnIncomeId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = EarnIncomeModel;
