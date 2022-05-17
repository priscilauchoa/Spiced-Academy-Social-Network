
DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship(
id          SERIAL PRIMARY KEY,
sender_id   INT,
recepient_id INT,
accepted BOOLEAN DEFAULT false,
user_id INT NOT NULL REFERENCES users(id)
);


INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (1,205,205);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,6,6);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,7,7);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,8,8);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,9,9);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,10,10);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,11,11);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,13,13);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,14,914);

INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (7,206,206);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (20,77,77);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (20,75,75);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (20,84,84);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,93,93);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,104,104);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,113,113);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,143,143);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,14,14);


INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,16,16);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,17,17);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (214,201,201);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (206,206,206);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (221,206,206);
INSERT INTO friendship (recepient_id, sender_id, accepted, user_id) VALUES (221,5, true, 5);
        