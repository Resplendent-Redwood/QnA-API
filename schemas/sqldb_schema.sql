DROP DATABASE IF EXISTS sample;

CREATE DATABASE sample;

\c sample;

-- DROP DOMAIN IF EXISTS url
-- CREATE DOMAIN url AS text
-- CHECK (
--    VALUE ~ 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.,~#?!&>//=]*)$'
-- );

-- DROP DOMAIN IF EXISTS email
-- CREATE DOMAIN email AS varchar(60)
-- CHECK(
--    VALUE ~ '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
-- );

DROP TABLE IF EXISTS questions;
CREATE TABLE questions
(
    question_id INT NOT NULL PRIMARY KEY,
    product_id INT NOT NULL,
    question_body VARCHAR(1000) NOT NULL,
    question_date TIMESTAMP NOT NULL,
    asker_name VARCHAR(60) NOT NULL,
    asker_email VARCHAR(60),
    reported BOOLEAN NOT NULL,
    question_helpfulness INT
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers
(
    answer_id INT NOT NULL PRIMARY KEY,
    question_id INT NOT NULL,
    answer_body VARCHAR(1000) NOT NULL,
    answer_date TIMESTAMP NOT NULL,
    answerer_name VARCHAR(60) NOT NULL,
    answerer_email VARCHAR(60),
    reported BOOLEAN NOT NULL,
    answer_helpfulness INT,
    FOREIGN KEY (question_id)
    REFERENCES questions(question_id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos
(
    id INT NOT NULL PRIMARY KEY,
    answer_id INT NOT NULL,
    photo_url TEXT CONSTRAINT proper_url CHECK (photo_url IS NULL OR photo_url ~* 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.,~#?!&>//=]*)$'),
    FOREIGN KEY (answer_id)
    REFERENCES answers(answer_id)
);

alter table questions alter column question_helpfulness set default 0;
alter table questions alter column reported set default false;
alter table answers alter column answer_helpfulness set default 0;
alter table answers alter column reported set default false;

-- COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
-- FROM '/Users/benjaminng/Personal_Files/HackReactor/SDC/QnA-API/raw_data/questions.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY answers(answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness)
-- FROM '/Users/benjaminng/Personal_Files/HackReactor/SDC/QnA-API/raw_data/answers.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY photos(id, answer_id, photo_url)
-- FROM '/Users/benjaminng/Personal_Files/HackReactor/SDC/QnA-API/raw_data/answers_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE INDEX question_report_index ON questions(reported);
-- CREATE INDEX question_product_id_index ON questions(product_id);
-- CREATE INDEX question_id_index ON questions(question_id);
-- CREATE INDEX answer_question_id_index ON answers(question_id);
-- CREATE INDEX answer_id_index ON answers(answer_id);
-- CREATE INDEX photo_answer_id_index ON photos(answer_id);

