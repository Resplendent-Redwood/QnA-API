const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/QnA', , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('Connected to monogoDB')})
.catch((err) => {console.log(err)});

const { Schema } = mongoose;

const ProductQuestionSchema = new Schema({
  product_id: Integer,
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Questions'
    }
  ]
});

const QuestionsSchema = new Schema({
  question_id: Integer,
  question_body: String,
  question_date: Date,
  asker_name: String,
  asker_email: String
  question_helpfulness: Integer,
  reported: Boolean,
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answers'
    }
  ]
});
QuestionsSchema.path('question_body').validate(function(question_body) {
  return question_body &&  question_body.length === 1000;
}, 'Your question cannot excceed 1000 characters');
QuestionsSchema.path('asker_name').validate(function(asker_name) {
  return asker_name &&  asker_name.length === 60;
}, 'Your name cannot excceed 60 characters');
QuestionsSchema.path('asker_email').validate(function(asker_email) {
  return asker_email &&  asker_email.length === 60;
}, 'Your email cannot excceed 60 characters');

const AnswersSchema = new Schema({
  answer_id: Integer,
  answer_body: String,
  answer_date: Date ,
  answerer_name: String,
  answerer_email: String,
  answer_helpfulness: Integer,
  reported: Boolean,
  photos: [
    {
      id: ObjectId(),
      url: String,
    }
  ],
});
AnswersSchema.path('answer_body').validate(function(answer_body) {
  return answer_body &&  answer_body.length === 1000;
}, 'Your answer cannot excceed 1000 characters');
AnswersSchema.path('answerer_name').validate(function(answerer_name) {
  return answerer_name &&  answerer_name.length === 60;
}, 'Your name cannot excceed 60 characters');
AnswersSchema.path('answerer_email').validate(function(answerer_email) {
  return answerer_email &&  asker_email.length === 60;
}, 'Your email cannot excceed 60 characters');
