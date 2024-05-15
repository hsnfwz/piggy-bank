const pool = require('../pg');

const AskQuestionModel = {};

AskQuestionModel.getAllRows = async (saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT title, description, date, ask_question_id AS "askQuestionId", saveinn_user_id AS "saveinnUserId" FROM ask_question WHERE saveinn_user_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT title, description, date, ask_question_id AS "askQuestionId", saveinn_user_id AS "saveinnUserId" FROM ask_question';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.getRowById = async (askQuestionId) => {
  try {
    const poolQuery = 'SELECT title, description, date, ask_question_id AS "askQuestionId", saveinn_user_id AS "saveinnUserId" FROM ask_question WHERE ask_question_id=$1';
    const { rows } = await pool.query(poolQuery, [askQuestionId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.insertRow = async (data) => {
  const {
    saveinnUserId,
    title,
    description,
  } = data;

  try {
    const poolQuery = 'INSERT INTO ask_question (saveinn_user_id, title, description) VALUES ($1, $2, $3)';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, title, description]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.updateRowById = async (askQuestionId, data) => {
  const {
    saveinnUserId,
    title,
    description,
  } = data;

  try {
    const poolQuery = 'UPDATE ask_question SET (saveinn_user_id, title, description) = ($1, $2, $3) WHERE ask_question_id=$4';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, title, description, askQuestionId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AskQuestionModel.deleteRowById = async (askQuestionId) => {
  try {
    const poolQuery = 'DELETE FROM ask_question WHERE ask_question_id=$1';
    const { rows } = await pool.query(poolQuery, [askQuestionId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = AskQuestionModel;
