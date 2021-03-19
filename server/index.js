require('dotenv').config()
const express = require('express');
const db = require('../postgres_db/postgresDB.js')
const app = express();
app.use(express.json());

const questionsRouter = require('../routes/questions');
app.use('./questions', questionsRouter)


app.get('./questions', auth, (req,res) => {

})

// authetication
function auth(req, res, next) {
  // req.headers.Adafd
}

// use cache to store data within a certain time
// use express-rate-limit to limit the traffic

app.listen(process.env.PORT, () => {
  console.log(`The server is up running on port ${process.env.PORT}`);
})