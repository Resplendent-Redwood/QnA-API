const pg = require('pg');
const { Pool, Client } = require('pg')

module.exports = pool = new Pool({
  host: 'ec2-54-177-103-99.us-west-1.compute.amazonaws.com',
  port: 5432,
  user: 'postgres',
  database: 'qna',
  password: '123456789',
  max: 100,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
})


// module.exports = client = new Client({
//   host: 'ec2-54-177-103-99.us-west-1.compute.amazonaws.com',
//   port: 5432,
//   user: 'postgres',
//   database: 'qna',
//   password: '123456789',
// })

pool.connect()
  .then(() => {
    console.log('connected to postgresDB')
  })
  .catch(err => console.error('connection error', err.stack))
