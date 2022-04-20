
DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship(
id          SERIAL PRIMARY KEY,
sender_id   INT,
recepient_id INT,
accepted BOOLEAN DEFAULT false,
user_id INT NOT NULL REFERENCES users(id)
);


INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (1,202,202);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,1,1);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,201,201);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,203,203);
INSERT INTO friendship (recepient_id, sender_id, accepted, user_id) VALUES (201,5, true, 5);
        