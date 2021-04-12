const models = require('../../postgres_db/models.js');

module.exports = {
  getQuestions: function(req, res) {
    let count = 5;
    if (req.query.count !== undefined) {
      count = req.query.count;
    }
    // console.log('before query')
    models.readQuestions(req.query.product_id, count, (err, results) => {
      // console.log('during query')
      if (err) {
        console.error(err);
        res.status(404);
      }
      let answerMeta = {}
      for (let question of results.rows) {
        if (question.answers.length > 0) {
          for (let answer of question.answers) {
            answerMeta[answer.id] = answer;
          }
        }
        question.answers = answerMeta;
      }
      // console.log(results.rows)
      res.status(200).send({ product_id: req.query.product_id, results: results.rows})
    })
  },

  addQuestions: function(req, res) {
    const questionsValueArray = [req.body.product_id, req.body.body, req.body.name, req.body.email];
    models.createQuestions(questionsValueArray, (err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send('Failed to add the question');
      }
      console.log(results);
      res.status(201).send('Created');
    })
  },

  reportQuestions: function(req, res) {
    models.updateQuestionsReport(req.params.question_id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send('Failed to report the question');
      }
      req.status(201).send('Reported');
    })

  },

  voteQuestionsHelpful: function(req, res) {
    models.updateQuestionsHelpfulness(req.params.question_id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send('Failed to vote the question');
      }
      res.status(201).send('Updated');
    })
  },



}