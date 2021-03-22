const pg = require('pg');
const db = require('./postgresDB.js');

const insertQuestion = 'INSERT INTO questions (product_id, question_body, asker_name, asker_email) VALUES ($1, $2, $3, $4) RETURNING *';

const insertAnswer = 'INSERT INTO answers (question_id, answer_body, answerer_name, answerer_email) VALUES ($1, $2, $3, $4) RETURNING *';

const insertPhotos = 'INSERT INTO photos (answer_id, url) VALUES ($1, $2) RETURNING *';


module.exports = {
/* ====================== questions table models ================== */
  createQuestions: function(valueArray, callback) {
    db.query(insertQuestion, valueArray, (err, results) => {
      if (err) {
        callback(err);
      }
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

  updateQuestionsReport: function(question_id, callback) {
    const query = `UPDATE questions SET reported='true'
                   WHERE question_id=${question_id};`;
    db.query(query, (err, results) => {
      if (err) {
        callback(err);
      }
      callback(null, results);
    })
  },

  updateQuestionsHelpfulness: function(question_id, callback) {
    const query = `UPDATE questions
                   SET question_helpfulness=question_helpfulness + 1
                   WHERE question_id=${question_id};`;
    db.query(query, (err, results) => {
    if (err) {
    callback(err);
    }
    callback(null, results);
})
  },

/* ====================== answers table models ================== */
  createAnswers: function(valueArray, insertAnswer, callback) {
    db.query(insertAnswer, valueArray, (err, results) => {
      if (err) {
        callback(err);
      }
      callback(null, results);
    })
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

  updateAnswersReport: function(answer_id, callback) {
    const query = `UPDATE answers SET reported='true'
                   WHERE answer_id=${answer_id};`;
    db.query(query, (err, results) => {
      if (err) {
        callback(err);
      }
      callback(null, results);
    })
  },

  updateAnswersHelpfulness: function(answer_id, callback) {
    const query = `UPDATE answers
                    SET helpfulness=answer_helpfulness + 1
                    WHERE answer_id=${answer_id};`;
    db.query(query, (err, results) => {
      if (err) {
      callback(err);
      }
      callback(null, results);
    })
  },

  /* ====================== photos table models ================== */
  createPhotos: function(valueArray, callback) {
    db.query((insertPhotos, valueArray), (err, results) => {
      if (err) {
        callback(err);
      }
      callback(null, results);
    })
  },
}