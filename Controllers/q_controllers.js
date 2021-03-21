const models = require('../postgres_db/models.js');

module.exports = {
  getQuestions: function(req, res) {
    //     console.log(req.query);
    // console.log(req.params);
    let count = 5;
    if (req.query.count !== undefined) {
      count = req.query.count;
    }
    models.readQuestions(req.query.product_id, count, (err, results) => {
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
    let values = []
  },

  reportQuestions: function(req, res) {

  },

  voteQuestionsHelpful: function(req, res) {

  },



}