require('dotenv').config();

const { Pool } = require('pg');

const connectionString = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({ connectionString });

module.exports = pool;