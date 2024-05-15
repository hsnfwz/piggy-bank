const pool = require('../pg');

const AnswerModel = {};

AnswerModel.getAllRows = async (askQuestionId) => {
  try {
    let rows = [];

    if (askQuestionId) {
      const poolQuery = 'SELECT title, description, date, answer_id AS "answerId", ask_question_id AS "askQuestionId", saveinn_user_id AS "saveinnUserId" FROM answer WHERE ask_question_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [askQuestionId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT title, description, date, answer_id AS "answerId", ask_question_id AS "askQuestionId", saveinn_user_id AS "saveinnUserId" FROM answer';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AnswerModel.getRowById = async (answerId) => {
  try {
    const poolQuery = 'SELECT title, description, date, answer_id AS "answerId", ask_question_id AS "askQuestionId", saveinn_user_id AS "saveinnUserId" FROM answer WHERE answer_id=$1';
    const { rows } = await pool.query(poolQuery, [answerId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AnswerModel.insertRow = async (data) => {
  const {
    saveinnUserId,
    askQuestionId,
    title,
    description,
  } = data;

  try {
    const poolQuery = 'INSERT INTO answer (saveinn_user_id, ask_question_id, title, description) VALUES ($1, $2, $3, $4)';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, askQuestionId, title, description]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AnswerModel.updateRowById = async (answerId, data) => {
  const {
    saveinnUserId,
    askQuestionId,
    title,
    description,
  } = data;

  try {
    const poolQuery = 'UPDATE answer SET (saveinn_user_id, ask_question_id, title, description) = ($1, $2, $3, $4) WHERE answer_id=$5';
    const { rows } = await pool.query(poolQuery, [saveinnUserId, askQuestionId, title, description, answerId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

AnswerModel.deleteRowById = async (answerId) => {
  try {
    const poolQuery = 'DELETE FROM answer WHERE answer_id=$1';
    const { rows } = await pool.query(poolQuery, [answerId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = AnswerModel;
