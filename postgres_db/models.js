const pg = require('pg');
const db = require('./postgresDB.js');

const insertQuestion = 'INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const questionValues = [];

const insertAnswer = 'INSERT INTO answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const answerValues = [];

const insertPhotos = 'INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3) RETURNING *';
const photoValues = [];

module.exports = {
/* ====================== questions table models ================== */
  createQuestions: function() {

  },

  readQuestions: function(product_id, resutls, callback) {
    const query = `SELECT json_build_object (
                          'question_id', q.question_id,
                          'question_body', q.question_body,
                          'question_date', q.question_date,
                          'asker_name', q.asker_name,
                          'question_helpfulness', q.question_helpfulness,
                          'reported', q.reported,
                          'answers', json_build_object (
                                    a.answer_id, json_build_object(
                                      'id', a.answer_id,
                                      'body', a.answer_body,
                                      'date', a.answer_date,
                                      'answerer_name', a.answerer_name,
                                      'helpfulness', a.answer_helpfulness,
                                      'photos', json_build_array (
                                          json_build_object (
                                              'id', p.id,
                                              'url', p.photo_url
                                          )
                                      )
                                    )
                          )
                    )
                    FROM questions q
                    INNER JOIN answers a ON q.question_id = a.question_id
                    INNER JOIN photos p ON p.answer_id = a.answer_id
                    WHERE product_id=${product_id}
                    AND q.reported='false'
                    ORDER BY q.question_helpfulness DESC;`
    db.query(query, (err, resutls, callback) => {
      if (err) {
        callback(err);
      }
      callback(null, resutls);
    })
},

  updateQuestionsRepot: function() {

  },

  updateQuestionsHelpfulness: function() {

  },

/* ====================== answers table models ================== */
  createAnswers: function() {

  },

  readAnswers: function() {

  },

  updateAnswersRepot: function() {

  },

  updateAnswersHelpfulness: function() {

  },
}