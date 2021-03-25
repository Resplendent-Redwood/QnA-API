const models = require('../../postgres_db/models.js');
const validation = require('../../postgres_db/db_validation.js');

module.exports = {
  getAnswers: function(req, res) {
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
      res.status(200).send({question: req.params.question_id, page: page, count: count, results: results.rows });
    })
  },

  addAnswers: function(req, res) {
    if(validation.is_email(req.body.email) && validation.is_username(req.body.name)) {
      const answerValueArray = [req.params.answer_id, req.body.body, req.body.name, req.body.email];
      if (req.body.photos.length > 0) {
        for (let photo of req.body.photos) {
          if (validation.is_url(photo)) {
            models.createPhotos([req.params.answer_id, photo], (err, results) => {
              if (err) {
                console.error(err);
                res.status(400).send('Failed to add photos');
              }
            })
          }
        }
      }
      models.createAnswers(answerValueArray, (err, results) => {
        if (err) {
          console.error(err);
          res.status(400).send('Failed to add answer');
        }
        res.status(201).send('Created');
      })
    } else {
      res.status(400).send('Something wrong with your name and email.')
    }
  },

  reportAnswers: function(req, res) {
    models.updateAnswersReport(req.params.answer_id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send('Failed to report the answer');
      }
      res.status(201).send('Reported');
    })
  },

  voteAnswersHelpful: function(req, res) {
    models.updateAnswersHelpfulness(req.params.answer_id, (err, results) => {
      if (err) {
        console.error(err);
        res.status(400).send('Failed to vote the answer');
      }
      res.status(201).send('Updated');
    })
  },

}