const models = require('../postgres_db/models.js');

module.exports = {
  getAnswers: function(req, res) {
    // console.log(req.query);
    // console.log(req.params);
    let count = 5;
    let page = 0;
    if (req.query.count !== undefined) {
      count = req.query.count;
    }
    if (req.query.page !== undefined) {
      page = req.query.page;
    }
    const offset = count * page;
    models.readAnswers(req.params.question_id, count, offset, (err, results) => {
      if (err) {
        console.error(err);
        res.status(404);
      }
        for (let answer of results.rows) {
          for (let photo of answer.photos) {
            if (photo.id === null) {
              answer.photos = []
            }
          }
        }
      res.status(200).send({question: req.params.question_id, page: page, count: count, results: results.rows });
    })
  },

  addAnswers: function(req, res) {

  },

  reportAnswers: function(req, res) {

  },

  voteAnswersHelpful: function(req, res) {

  },

}