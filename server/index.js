require('dotenv').config()
const express = require('express');
const compression = require('compression');

const db = require('../postgres_db/postgresDB.js')
// const mongodb = require('../mongodb/mongodb.js')
const qc = require('./controllers/q_controllers.js');
const ac = require('./controllers/a_controllers.js');



const app = express();
const host = 'localhost';
const port = 3000;

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.get('/qa/questions', qc.getQuestions)

app.get('/qa/questions/:question_id/answers', ac.getAnswers)

app.post('/qa/questions', qc.addQuestions)

app.post('/qa/questions/:question_id/answers', ac.addAnswers)

app.put('/qa/questions/:question_id/helpful', qc.voteQuestionsHelpful)

app.put('/qa/questions/:question_id/report', qc.reportQuestions)

app.put('/qa/answers/:answer_id/helpful', ac.voteAnswersHelpful)

app.put('/qa/answers/:answer_id/report', ac.reportAnswers)

// authetication
// function auth(req, res, next) {
// }

// use cache to store data within a certain time
// use express-rate-limit to limit the traffic

app.listen(port, () => {
  console.log(`The server is up running at http://${host}:${port}`);
})