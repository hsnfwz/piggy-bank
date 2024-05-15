const pool = require('../pg');

const UserGroupModel = {};

UserGroupModel.getAllRows = async () => {
  try {
    let rows = [];
    const poolQuery = 'SELECT name, description, is_public AS "isPublic", user_group_id AS "userGroupId" FROM user_group';
    const { rows: _rows } = await pool.query(poolQuery);
    rows = _rows;
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserGroupModel.getRowById = async (userGroupId) => {
  try {
    const poolQuery = 'SELECT name, description, is_public AS "isPublic", user_group_id AS "userGroupId" FROM user_group WHERE user_group_id=$1';
    const { rows } = await pool.query(poolQuery, [userGroupId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserGroupModel.insertRow = async (data) => {
  const {
    name,
    description,
    isPublic,
  } = data;

  try {
    const poolQuery = 'INSERT INTO user_group (name, description, is_public) VALUES ($1, $2, $3) RETURNING user_group_id AS "userGroupId"';
    const { rows } = await pool.query(poolQuery, [name, description, isPublic]);
    return { message: 'Success', row: rows[0] };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserGroupModel.updateRowById = async (userGroupId, data) => {
  const {
    name,
    description,
    isPublic,
  } = data;

  try {
    const poolQuery = 'UPDATE user_group SET (name, description, is_public) = ($1, $2, $3) WHERE user_group_id=$4';
    const { rows } = await pool.query(poolQuery, [name, description, isPublic, userGroupId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserGroupModel.deleteRowById = async (userGroupId) => {
  try {
    const poolQuery = 'DELETE FROM user_group WHERE user_group_id=$1';
    const { rows } = await pool.query(poolQuery, [userGroupId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = UserGroupModel;
