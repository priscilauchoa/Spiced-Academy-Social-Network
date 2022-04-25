
DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship(
id          SERIAL PRIMARY KEY,
sender_id   INT,
recepient_id INT,
accepted BOOLEAN DEFAULT false,
user_id INT NOT NULL REFERENCES users(id)
);


INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (1,202,202);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,6,6);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,7,7);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,8,8);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,9,9);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,10,10);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,11,11);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,13,13);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,14,914);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,16,16);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,17,17);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,201,201);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,203,203);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,203,203);
INSERT INTO friendship (recepient_id, sender_id, accepted, user_id) VALUES (201,5, true, 5);
        