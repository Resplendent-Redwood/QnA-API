const fs = require('fs');
const parser = require('csv-parse');

const insertQuestion = 'INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const questionValues = [];

const insertAnswer = 'INSERT INTO answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const answerValues = [];

const insertPhotos = 'INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3) RETURNING *';
const photoValues = [];

let count = 0;

// const csvParser = parser({
//   delimiter: ','
// });

const readStream = fs.createReadStream('./sample_data/questions_sample.csv')
const writeStream = fs.createWriteStream('./sample_data/questions_sample_output.csv')

readStream.pipe(parser())
          .pipe(writeStream)
          .on('data', (row) => {
            console.log(row);
              // if (count === 0) {
              //   for (let i = 0; i < row.length; i++) {
              //     row[i] = row[i].trim()

              //   }
              //   row = row.join(',');
              //   console.log(row);
              //   writeStream.write(row)
              // } else {
              //   if (is_Number(row[0]) && is_Number(row[1]) && is_Number(row[7]) && is_email(row[5])) {
              //     row = row.join(',');
              //     console.log(row);
              //     writeStream.write(row)
              //   }
              // }
              // count++
          })
          .on('end', () => {
              console.log('read done')
          })

/* ============= helper functions for validation =================== */

function is_Number(str) {
  if (Number(str) === NaN) {
    return 0;
  } else {
    return Number(str);
  }
}

function is_username(username) {
  const regexp = /^[0-9a-zA-Z]+$/;
  return regexp.test(username);
 }

 function is_email(email) {
   const regexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   return regexp.test(email);
 }

 function is_url(url) {
   const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

   return regexp.test(url);
 }

//  module.exports = {
//    is_username: is_username,
//    is_email: is_email,
//    is_url: is_url,
//  }