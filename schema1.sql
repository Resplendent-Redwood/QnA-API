CREATE TABLE IF NOT EXISTS Questions
(
    question_id INT NOT NULL PRIMARY KEY,
    question_body TEXT NOT NULL,
    question_date DATE NOT NULL,
    asker_name VARCHAR(50) NOT NULL,
    question_helpfulness INT,
    reported BOOLEAN NOT NULL,
);

CREATE TABLE IF NOT EXISTS Answers
(
    answer_id INT NOT NULL PRIMARY KEY,
    answer_body TEXT NOT NULL,
    answer_date DATE NOT NULL,
    asker_name VARCHAR(50) NOT NULL,
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