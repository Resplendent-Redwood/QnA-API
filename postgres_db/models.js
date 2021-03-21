const pg = require('pg');
const db = require('./postgresDB.js');

const insertQuestion = 'INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';


const insertAnswer = 'INSERT INTO answers (answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
const answerValues = [];

const insertPhotos = 'INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3) RETURNING *';
const photoValues = [];

module.exports = {
/* ====================== questions table models ================== */
  createQuestions: function(valueArray, callback) {
    db.query((insertQuestion, valueArray), (err, results) => {
      if (err) { callback(eer) }
      callback(null, results);
    })

  },

  readQuestions: function(product_id, count, callback) {
    const query = `
                      SELECT q.question_id,
                          q.question_body,
                          q.question_date,
                          q.asker_name,
                          q.question_helpfulness,
                          q.reported,
                              (SELECT COALESCE(json_agg(an), '[]'::json)
                          FROM (SELECT a.answer_id AS id,
                                      a.answer_body AS body,
                                      a.answer_date AS date,
                                      a.answerer_name,
                                      a.answer_helpfulness AS helpfulness,
                                      (SELECT COALESCE(json_agg(ph), '[]'::json)
                                  FROM (SELECT p.id,
                                            p.photo_url AS url
                                    FROM photos p
                                    WHERE p.answer_id=a.answer_id
                                    )ph
                                  ) photos
                              FROM answers a
                              WHERE a.question_id=q.question_id
                              AND a.reported='false'
                              ) an
                          ) answers
                      FROM questions q
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
    const query = `SELECT a.answer_id AS id,
                          a.answer_body AS body,
                          a.answer_date AS date,
                          a.answerer_name,
                          a.answer_helpfulness AS helpfulness,
                          (SELECT COALESCE(json_agg(ph), '[]'::json)
                        FROM (SELECT p.id,
                                p.photo_url AS url
                            FROM photos p
                            WHERE p.answer_id=a.answer_id
                            )ph
                          ) photos
                      FROM answers a
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