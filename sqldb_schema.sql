DROP DATABASE IF EXISTS qna;

CREATE DATABASE qna;

USE qna;

CREATE TABLE IF NOT EXISTS questions
(
    question_id INT NOT NULL PRIMARY KEY,
    question_body TEXT NOT NULL CONSTRAINT q_body_chk CHECK (char_length(question_body) <= 1000),
    question_date DATE NOT NULL,
    question_helpfulness INT,
    reported BOOLEAN NOT NULL,
    product_id INT NOT NULL,
);

CREATE TABLE IF NOT EXISTS answers
(
    answer_id INT NOT NULL PRIMARY KEY,
    answer_body TEXT NOT NULL CONSTRAINT a_body_chk CHECK (char_length(answer_body) <= 1000),
    answer_date DATE NOT NULL,
    answer_helpfulness INT,
    reported BOOLEAN NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id)
    REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS photos
(
    photo_url TEXT NOT NULL PRIMARY KEY,
    answer_id INT NOT NULL,
    FOREIGN KEY (answer_id)
    REFERENCES answers(answer_id)
);

CREATE TABLE IF NOT EXISTS qna_users
(
    user_email VARCHAR(60) NOT NULL PRIMARY KEY,
    user_name VARCHAR(60) NOT NULL,
    verify_buyer BOOLEAN NOT NULL,
);

CREATE TABLE IF NOT EXISTS user_questions
(
    user_email VARCHAR(60) NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY(user_email, question_id)
);

CREATE TABLE IF NOT EXISTS user_answers
(
    user_email VARCHAR(60) NOT NULL,
    answers_id INT NOT NULL,
    PRIMARY KEY(user_email, answers_id)
);