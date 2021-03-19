const pg = require('pg');
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sample',
  password: '123456789',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  pool.end()
})

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'sample',
  password: '123456789',
})

client.connect()
  .then(() => {
    console.log('connected to postgresDB')
  })
  .catch(err => console.error('connection error', err.stack))


