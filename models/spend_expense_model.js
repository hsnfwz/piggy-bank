const pool = require('../pg');

const SpendExpenseModel = {};

SpendExpenseModel.getAllRows = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT title, description, category, amount, spend_expense_id AS "spendExpenseId" FROM spend_expense WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT title, description, category, amount, spend_expense_id AS "spendExpenseId" FROM spend_expense';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.sum = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT SUM(amount) FROM spend_expense WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    }
  
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.averageByCategory = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT AVG(amount), category FROM spend_expense WHERE saveinn_user_id=$1 GROUP BY category';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.getRowById = async (spendExpenseId) => {
  try {
    const poolQuery = 'SELECT title, description, category, amount, spend_expense_id AS "spendExpenseId" FROM spend_expense WHERE spend_expense_id=$1';
    const { rows } = await pool.query(poolQuery, [spendExpenseId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.insertRow = async (data) => {
  const {
    saveinnUserId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'INSERT INTO spend_expense (saveinn_user_id, amount, title, description, category) VALUES ($1, $2, $3, $4, $5)';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, amount, title, description, category]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.updateRowById = async (spendExpenseId, data) => {
  const {
    saveinnUserId,
    amount,
    title,
    description,
    category,
  } = data;

  try {
    const poolQuery = 'UPDATE spend_expense SET (saveinn_user_id, amount, title, description, category) = ($1, $2, $3, $4, $5) WHERE spend_expense_id=$6';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, amount, title, description, category, spendExpenseId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SpendExpenseModel.deleteRowById = async (spendExpenseId) => {
  try {
    const poolQuery = 'DELETE FROM spend_expense WHERE spend_expense_id=$1';
    const { rows } = await pool.query(poolQuery, [spendExpenseId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = SpendExpenseModel;
