const models = require('../postgres_db/models.js');

module.exports = {
  getQuestions: function(req, res) {
    // console.log(req)
    models.readQuestions(req.query.product_id, req.query.count, (err, results) => {
      if (err) {
        console.error(err);
        res.status(404);
      }
      let questions = [];
      for (let question of results.rows) {
        questions.push(question.json_build_object);
      }
      res.status(200).send({ product_id: req.query.product_id, results: questions})
    })
  },

  addQuestions: function(req, res) {

  },

  reportQuestions: function(req, res) {

  },

  voteQuestionsHelpful: function(req, res) {

  },



}