DROP DATABASE IF EXISTS qna;

CREATE DATABASE qna;

\c qna;

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
CREATE SEQUENCE answers_answer_id_seq;
CREATE SEQUENCE questions_question_id_seq;
CREATE SEQUENCE photos_id_seq;

DROP TABLE IF EXISTS questions;
CREATE TABLE questions
(
    question_id INTEGER DEFAULT nextval('questions_question_id_seq') NOT NULL PRIMARY KEY,
    product_id INT NOT NULL,
    question_body VARCHAR(1000) NOT NULL,
    question_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    asker_name VARCHAR(60) NOT NULL,
    asker_email VARCHAR(60),
    reported BOOLEAN NOT NULL DEFAULT false,
    question_helpfulness INT DEFAULT 0
);

DROP TABLE IF EXISTS answers;
CREATE TABLE answers
(
    answer_id INTEGER DEFAULT nextval('answers_answer_id_seq') NOT NULL PRIMARY KEY,
    question_id INT NOT NULL,
    answer_body VARCHAR(1000) NOT NULL,
    answer_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    answerer_name VARCHAR(60) NOT NULL,
    answerer_email VARCHAR(60),
    reported BOOLEAN NOT NULL DEFAULT false,
    answer_helpfulness INT DEFAULT 0,
    FOREIGN KEY (question_id)
    REFERENCES questions(question_id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos
(
    id INTEGER DEFAULT nextval('photos_id_seq') NOT NULL PRIMARY KEY,
    answer_id INT NOT NULL,
    photo_url TEXT CONSTRAINT proper_url CHECK (photo_url IS NULL OR photo_url ~* 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.,~#?!&>//=]*)$'),
    FOREIGN KEY (answer_id)
    REFERENCES answers(answer_id)
);

CREATE INDEX question_report_index ON questions(reported);
CREATE INDEX answer_report_index ON answers(reported);
CREATE INDEX question_id_index ON questions(question_id);
CREATE INDEX answer_question_id_index ON answers(question_id);
CREATE INDEX answer_id_index ON answers(answer_id);
CREATE INDEX photo_answer_id_index ON photos(answer_id);

-- COPY questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
-- FROM '/home/ubuntu/raw_data/questions.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY answers(answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness)
-- FROM '/home/ubuntu/raw_data/answers.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY photos(id, answer_id, photo_url)
-- FROM '/home/ubuntu/raw_data/answers_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- clean up after data load
-- UPDATE answers
-- SET answerer_email = ''
-- WHERE answerer_email IS NULL;
-- EXPLAIN ANALYZE SELECT q.question_id,
--                           q.question_body,
--                           q.question_date,
--                           q.asker_name,
--                           q.question_helpfulness,
--                           q.reported,
--                               (SELECT COALESCE(json_agg(an), '[]'::json)
--                           FROM (SELECT a.answer_id AS id,
--                                       a.answer_body AS body,
--                                       a.answer_date AS date,
--                                       a.answerer_name,
--                                       a.answer_helpfulness AS helpfulness,
--                                       (SELECT COALESCE(json_agg(ph), '[]'::json)
--                                   FROM (SELECT p.id,
--                                             p.photo_url AS url
--                                     FROM photos p
--                                     WHERE p.answer_id=a.answer_id
--                                     )ph
--                                   ) photos
--                               FROM answers a
--                               WHERE a.question_id=q.question_id
--                               AND a.reported='false'
--                               ) an
--                           ) answers
--                       FROM questions q
--                       WHERE q.product_id=123
--                       AND q.reported='false'
--                       GROUP BY q.question_id
--                       ORDER BY q.question_helpfulness DESC
--                       LIMIT 100;

