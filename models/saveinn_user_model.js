const pool = require('../pg');
const encryption = require('../utilities/encryption');

const SaveinnUserModel = {};

SaveinnUserModel.getAllRows = async () => {
  try {
    const poolQuery = 'SELECT saveinn_user_id AS "saveinnUserId", budget_member_id AS "budgetMemberId", budget_assistant_id AS "budgetAssistantId", email, username FROM saveinn_user';
    const { rows } = await pool.query(poolQuery);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.usersInAllGroups = async () => {
  try {
    const poolQuery = 'SELECT saveinn_user_id AS "saveinnUserId", budget_member_id AS "budgetMemberId", budget_assistant_id AS "budgetAssistantId" FROM saveinn_user AS s WHERE NOT EXISTS ((SELECT saveinn_user_id FROM user_belongs_to_group) EXCEPT (SELECT saveinn_user_id FROM saveinn_user WHERE saveinn_user_id=s.saveinn_user_id))';
    const { rows } = await pool.query(poolQuery);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.getRowById = async (saveinnUserId) => {
  try {
    const poolQuery = 'SELECT saveinn_user_id AS "saveinnUserId", budget_member_id AS "budgetMemberId", budget_assistant_id AS "budgetAssistantId", email, username FROM saveinn_user WHERE saveinn_user_id=$1';
    const { rows } = await pool.query(poolQuery, [saveinnUserId]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.insertRow = async (data) => {
  const {
    email,
    username,
    password,
    budgetMemberId,
    budgetAssistantId,
  } = data;

  try {
    const poolQuery = 'SELECT * FROM saveinn_user WHERE email=$1 OR username=$2';
    const { rows } = await pool.query(poolQuery, [email, username]);
  
    if (rows.length > 0 && (rows[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
    if (rows.length > 0 && (rows[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const encryptedPassword = await encryption.generatePassword(password);
    const salt = encryptedPassword.salt;
    const hash = encryptedPassword.hash;
  
    const _poolQuery = 'INSERT INTO saveinn_user (username, email, salt, hash, budget_member_id, budget_assistant_id) VALUES ($1, $2, $3, $4, $5, $6)';
  
    const { rows: _rows } = await pool.query(_poolQuery, [username, email, salt, hash, budgetMemberId, budgetAssistantId]);

    return { message: 'Success', rows: _rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.updateRowById = async (saveinnUserId, data) => {
  // ...
}

SaveinnUserModel.updateEmail = async (saveinnUserId, data) => {
  const { email } = data;

  try {
    const poolQuery = 'SELECT * FROM saveinn_user WHERE email=$1';
    const { rows } = await pool.query(poolQuery, [email]);
  
    if (rows.length > 0 && (rows[0].email === email)) return { message: `An account with email ${email} already exists.`, rows: [] };
  
    const _poolQuery = 'UPDATE saveinn_user SET email=$1 WHERE saveinn_user_id=$2';
  
    const { rows: _rows } = await pool.query(_poolQuery, [email, saveinnUserId]);

    return { message: 'Success', rows: _rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.updateUsername = async (saveinnUserId, data) => {
  const { username } = data;

  try {
    const poolQuery = 'SELECT * FROM saveinn_user WHERE username=$1';
    const { rows } = await pool.query(poolQuery, [username]);
  
    if (rows.length > 0 && (rows[0].username === username)) return { message: `An account with username ${username} already exists.`, rows: [] };
  
    const _poolQuery = 'UPDATE saveinn_user SET username=$1 WHERE saveinn_user_id=$2';
  
    const { rows: _rows } = await pool.query(_poolQuery, [username, saveinnUserId]);

    return { message: 'Success', rows: _rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.updatePassword = async (saveinnUserId, data) => {
  const { password } = data;

  try {
    const encryptedPassword = await encryption.generatePassword(password);
    const salt = encryptedPassword.salt;
    const hash = encryptedPassword.hash;

    const poolQuery = 'UPDATE saveinn_user SET (salt, hash) = ($1, $2) WHERE saveinn_user_id=$3';

    const { rows } = await pool.query(poolQuery, [salt, hash, saveinnUserId]);

    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.deleteRowById = async (saveinnUserId) => {
  try {
    const poolQuery = 'DELETE FROM saveinn_user WHERE saveinn_user_id=$1';
    const { rows } = await pool.query(poolQuery, [saveinnUserId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

SaveinnUserModel.auth = async (req) => {
  try {
    let user = undefined;
    if (req.session && req.session.user) user = req.session.user;
    return { message: 'Authenticated', user };
  } catch(error) {
    return { message: error, user };
  }
}

SaveinnUserModel.signIn = async (req, data) => {
  const { email, password } = data;

  try {
    const poolQuery = 'SELECT saveinn_user_id AS "saveinnUserId", budget_member_id AS "budgetMemberId", budget_assistant_id AS "budgetAssistantId", email, username, salt, hash FROM saveinn_user WHERE email=$1'
    const { rows } = await pool.query(poolQuery, [email]);
  
    if (rows.length === 0) return { message: `An account with email ${email} does not exist.`, user: undefined };

    const isValid = encryption.validatePassword(password, rows[0].hash, rows[0].salt);

    if (!isValid) return { message: 'Password is incorrect.', user: undefined };

    req.session.user = {
      saveinnUserId: rows[0].saveinnUserId,
      budgetMemberId: rows[0].budgetMemberId,
      budgetAssistantId: rows[0].budgetAssistantId,
      email: rows[0].email,
      username: rows[0].username,
    };
  
    return { message: `Signed in as ${rows[0].email}`, user: req.session.user };
  } catch(error) {
    return { message: error, user: undefined };
  }
}

SaveinnUserModel.signOut = async (req) => {
  try {
    await req.session.destroy();
    return { message: 'Signed out.', user: undefined };
  } catch(error) {
    return { message: error, user: undefined };
  }
}

module.exports = SaveinnUserModel;
