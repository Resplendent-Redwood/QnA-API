require('dotenv').config()
const express = require('express');

const app = express();
app.use(express.json());

const questionsRouter = require('../routes/questions');
app.use('./questions', questionsRouter)



// authetication
function auth(req, res, next) {

}

// use cache to store data within a certain time
// use express-rate-limit to limit the traffic

app.listen(process.env.PORT, () => {
  console.log(`The server is up running on port ${process.env.PORT}`);
})