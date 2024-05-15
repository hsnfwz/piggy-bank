const { Pool } = require('pg');

const connectionString = 'postgres://postgres:postgres@localhost:5432/saveinn';
const pool = new Pool({ connectionString });

module.exports = pool;