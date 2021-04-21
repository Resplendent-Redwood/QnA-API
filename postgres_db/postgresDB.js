const pg = require('pg');
const { Pool, Client } = require('pg')
require('dotenv').config();

module.exports = pool = new Pool({
  host: process.env.POSTGRESHOST,
  port: 5432,
  user: process.env.POSTGRESUSER,
  database: 'qna',
  password: process.env.POSTGRESPASSWORD,

})

