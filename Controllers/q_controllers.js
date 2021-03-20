const models = require('../postgres_db/models.js');

module.exports = {
  getQuestions: function(req, res) {
    // console.log(req)
    let count = 5;
    if (req.query.count !== undefined) {
      count = req.query.count;
    }
    models.readQuestions(req.query.product_id, count, (err, results) => {
      if (err) {
        console.error(err);
        res.status(404);
      }

      for (let question of results.rows) {
        for (let answer in question.answers) {
          // console.log(question.answers[answer])
          for (let photo of question.answers[answer].photos) {
            // console.log(photo)
            if (photo.id === null) {
              question.answers[answer].photos = []
            }
          }
        }
      }
      res.status(200).send({ product_id: req.query.product_id, results: results.rows})
    })
  },

  addQuestions: function(req, res) {

  },

  reportQuestions: function(req, res) {

  },

  voteQuestionsHelpful: function(req, res) {

  },



}