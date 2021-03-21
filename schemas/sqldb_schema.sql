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
    question_id SERIAL NOT NULL PRIMARY KEY,
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
    answer_id SERIAL NOT NULL PRIMARY KEY,
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
    id SERIAL NOT NULL PRIMARY KEY,
    answer_id INT NOT NULL,
    photo_url TEXT CONSTRAINT proper_url CHECK (photo_url IS NULL OR photo_url ~* 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,255}\.[a-z]{2,9}\y([-a-zA-Z0-9@:%_\+.,~#?!&>//=]*)$'),
    FOREIGN KEY (answer_id)
    REFERENCES answers(answer_id)
);

alter table questions alter column question_helpfulness set default 0;
alter table questions alter column reported set default false;
alter table answers alter column answer_helpfulness set default 0;
alter table answers alter column reported set default false;
create sequence questions_question_id_serial
   owned by questions.question_id;

alter table questions
   alter column question_id set default nextval('questions_question_id_serial');

commit;
create sequence answers_answer_id_serial
   owned by answers.answer_id;

alter table answers
   alter column answer_id set default nextval('answers_answer_id_serial');

commit;
create sequence photos_id_serial
   owned by photos.id;

alter table photos
   alter column id set default nextval('photos_id_serial');

commit;
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
-- CREATE INDEX question_id_index ON questions(question_id);
-- CREATE INDEX answer_question_id_index ON answers(question_id);
-- CREATE INDEX answer_id_index ON answers(answer_id);
-- CREATE INDEX photo_answer_id_index ON photos(answer_id);

EXPLAIN ANALYZE
SELECT row_to_json(results)
FROM (
	SELECT q.question_id,
			q.question_body,
			q.question_date,
			q.asker_name,
			q.question_helpfulness,
			q.reported,
	        (SELECT json_agg(an)
			 FROM (SELECT a.answer_id AS id,
				          a.answer_body AS body,
				          a.answer_date AS date,
				          a.answerer_name,
				          a.answer_helpfulness AS helpfulness,
				          (SELECT json_agg(ph)
						   FROM (SELECT p.id,
								        p.photo_url AS url
								 FROM photos p
								 WHERE p.answer_id=a.answer_id
								)ph
						  ) photos
				   FROM answers a
				   WHERE a.question_id=q.question_id
				   AND a.reported='false'
				  ) an
			) answers
	FROM questions q
	WHERE q.product_id=1
	AND q.reported='false'
	GROUP BY q.question_id
	ORDER BY q.question_helpfulness DESC
) results

EXPLAIN ANALYZE
SELECT
        a.answer_id,
        a.answer_body AS body,
        a.answer_date AS date,
        a.answerer_name,
        a.answer_helpfulness AS helpfulness,
        json_agg (
                json_build_object(
                    'id', p.id,
                    'url', p.photo_url
                    )
        ) AS "photos"
FROM answers a
LEFT JOIN photos p ON a.answer_id = p.answer_id
WHERE a.question_id=52397
AND a.reported='false'

GROUP BY a.answer_id
ORDER BY a.answer_helpfulness DESC
LIMIT 5 OFFSET 0;

