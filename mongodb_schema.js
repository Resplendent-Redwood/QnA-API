const mongoose = require('mongoose');

const { Schema } = mongoose;

const Product_Question = new Schema({
  product_id: Integer,
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Questions'
    }
  ]
});

const Questions = new Schema({
  question_id: Integer,
  question_body: String,
  question_date: Date ,
  asker_name: String,
  question_helpfulness: Integer,
  reported: Boolean,
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answers'
    }
  ]
});

const Answers = new Schema({
  answer_id: Integer,
  answer_body: String,
  answer_date: Date ,
  answerer_name: String,
  answer_helpfulness: Integer,
  reported: Boolean,
  photos: [
    {
      id: Integer,
      url: String,
    }
  ],
  ]
});
