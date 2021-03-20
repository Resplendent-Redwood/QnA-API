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

  readQuestions: function(product_id, count, callback) {
    const query = `SELECT q.question_id,
                          q.question_body,
                          q.question_date,
                          q.asker_name,
                          q.question_helpfulness,
                          q.reported,
                          json_object_agg(
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
                                        ))
                                      )
                                  ) AS "answers"
                      FROM questions q
                      LEFT JOIN answers a ON q.question_id = a.question_id
                      LEFT JOIN photos p ON a.answer_id = p.answer_id
                      WHERE q.product_id=${product_id}
                      AND q.reported='false'
                      GROUP BY q.question_id
                      ORDER BY q.question_helpfulness DESC
                      LIMIT ${count};`;
    db.query(query, (err, results) => {
      if (err) {
        callback(err);
      }
      callback(null, results);
    })
},

  updateQuestionsRepot: function() {

  },

  updateQuestionsHelpfulness: function() {

  },

/* ====================== answers table models ================== */
  createAnswers: function() {

  },

  readAnswers: function(question_id, count, offset, callback) {
    const query = `SELECT a.answer_id,
                          a.answer_body AS body,
                          a.answer_date AS date,
                          a.answerer_name,
                          a.answer_helpfulness AS helpfulness,
                          json_agg (
                                  json_build_object(
                                      'id', p.id,
                                      'url', p.photo_url
                                      )
                          ) AS "photos"
                      FROM answers a
                      LEFT JOIN photos p ON a.answer_id = p.answer_id
                      WHERE a.question_id=${question_id}
                      AND a.reported='false'
                      GROUP BY a.answer_id
                      ORDER BY a.answer_helpfulness DESC
                      LIMIT ${count} OFFSET ${offset};`;
    db.query(query, (err, results) => {
      if (err) {
        callback(err);
      }
      callback(null, results);
    })
  },

  updateAnswersRepot: function() {

  },

  updateAnswersHelpfulness: function() {

  },
}