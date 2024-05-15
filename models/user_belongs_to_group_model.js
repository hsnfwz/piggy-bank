const pool = require('../pg');

const UserBelongsToGroupModel = {};

UserBelongsToGroupModel.getAllRows = async (userGroupId, saveinnUserId) => {
  try {
    let rows = [];

    if (saveinnUserId) {
      const poolQuery = 'SELECT user_belongs_to_group.user_group_id AS "userGroupId", user_belongs_to_group.saveinn_user_id AS "saveinnUserId", saveinn_user.budget_member_id AS "budgetMemberId", saveinn_user.budget_assistant_id AS "budgetAssistantId" FROM user_belongs_to_group INNER JOIN saveinn_user ON user_belongs_to_group.saveinn_user_id=saveinn_user.saveinn_user_id WHERE user_belongs_to_group.saveinn_user_id=$1 ';
      const { rows: _rows } = await pool.query(poolQuery, [saveinnUserId]);
      rows = _rows;
    } else if (userGroupId) {
      const poolQuery = 'SELECT user_belongs_to_group.user_group_id AS "userGroupId", user_belongs_to_group.saveinn_user_id AS "saveinnUserId", saveinn_user.budget_member_id AS "budgetMemberId", saveinn_user.budget_assistant_id AS "budgetAssistantId" FROM user_belongs_to_group INNER JOIN saveinn_user ON user_belongs_to_group.saveinn_user_id=saveinn_user.saveinn_user_id WHERE user_belongs_to_group.user_group_id=$1';
      const { rows: _rows } = await pool.query(poolQuery, [userGroupId]);
      rows = _rows;
    } else {
      const poolQuery = 'SELECT user_group_id AS "userGroupId", saveinn_user_id AS "saveinnUserId" FROM user_belongs_to_group INNER JOIN saveinn_user ON user_belongs_to_group.saveinn_user_id=saveinn_user.saveinn_user_id';
      const { rows: _rows } = await pool.query(poolQuery);
      rows = _rows;
    }
  
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserBelongsToGroupModel.getRowById = async (userGroupId, saveinnUserId) => {
  try {
    const poolQuery = 'SELECT user_group_id AS "userGroupId", saveinn_user_id AS "saveinnUserId" FROM user_belongs_to_group WHERE user_group_id=$1 AND saveinn_user_id=$2';
    const { rows } = await pool.query(poolQuery, [userGroupId, saveinnUserId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserBelongsToGroupModel.insertRow = async (data) => {
  const {
    userGroupId,
    saveinnUserId,
  } = data;

  try {
    const poolQuery = 'INSERT INTO user_belongs_to_group (user_group_id, saveinn_user_id) VALUES ($1, $2)';
    const { rows } = await pool.query(poolQuery, [userGroupId, saveinnUserId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

UserBelongsToGroupModel.updateRowById = async (userGroupId, saveinnUserId, data) => {
  // ...
}

UserBelongsToGroupModel.deleteRowById = async (userGroupId, saveinnUserId) => {
  try {
    const poolQuery = 'DELETE FROM user_belongs_to_group WHERE user_group_id=$1 AND saveinn_user_id=$2';
    const { rows } = await pool.query(poolQuery, [userGroupId, saveinnUserId]);
    return { message: 'Success', rows };
  } catch(error) {
    return { message: error, rows: [] };
  }
}

module.exports = UserBelongsToGroupModel;
