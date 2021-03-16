DROP DATABASE IF EXISTS QnA;

CREATE DATABASE QnA;

USE QnA;

CREATE TABLE IF NOT EXISTS Questions
(
    question_id INT NOT NULL PRIMARY KEY,
    question_body TEXT NOT NULL CONSTRAINT q_bodychk CHECK (char_length(question_body) <= 1000),
    question_date DATE NOT NULL,
    asker_name VARCHAR(60) NOT NULL,
    asker_email VARCHAR(60) NOT NULL,
    question_helpfulness INT,
    reported BOOLEAN NOT NULL,
    product_id INT NOT NULL,
);

CREATE TABLE IF NOT EXISTS Answers
(
    answer_id INT NOT NULL PRIMARY KEY,
    answer_body TEXT NOT NULL CONSTRAINT a_bodychk CHECK (char_length(answer_body) <= 1000),
    answer_date DATE NOT NULL,
    answerer_name VARCHAR(60) NOT NULL,
    answerer_email VARCHAR(60) NOT NULL,
    answer_helpfulness INT,
    reported BOOLEAN NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id)
    REFERENCES Questions(question_id);
);

CREATE TABLE IF NOT EXISTS Photos
(
    photo_url TEXT NOT NULL PRIMARY KEY,
    answer_id INT NOT NULL,
    FOREIGN KEY (answer_id)
    REFERENCES Answers(answer_id);
);