const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/QnA', , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('Connected to monogoDB')})
.catch((err) => {console.log(err)});

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  product_id: Integer,
  questions: [
    {
      question_id: Integer,
      question_body: {
        type: String,
        maxLength: 1000,
      },
      question_date: Date,
      asker_name: {
        type: String,
        maxLength: 60,
      },
      asker_email: {
        type: String,
        maxLength: 60,
      },
      question_helpfulness: Integer,
      reported: Boolean,
      answers: [
        {
          answer_id: Integer,
          answer_body: {
            type: String,
            maxLength: 1000,
          },
          answer_date: Date ,
          answerer_name: {
            type: String,
            maxLength: 60,
          },
          answerer_email: {
            type: String,
            maxLength: 60,
          },
          answer_helpfulness: Integer,
          reported: Boolean,
          photos: [
            {
              id: ObjectId(),
              url: String,
            }
          ],
        }
      ]
    }
  ]
});
