require('dotenv').config()
const express = require('express');
const db = require('../postgres_db/postgresDB.js')
const app = express();
app.use(express.json());



app.get('/qa/questions', (req,res) => {

})

app.get('/qa/questions/:question_id/answers', (req,res) => {

})

// authetication
// function auth(req, res, next) {
// }

// use cache to store data within a certain time
// use express-rate-limit to limit the traffic

app.listen(process.env.PORT, () => {
  console.log(`The server is up running on port ${process.env.PORT}`);
})