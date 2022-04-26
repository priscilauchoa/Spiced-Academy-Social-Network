
DROP TABLE IF EXISTS friendship;

CREATE TABLE friendship(
id          SERIAL PRIMARY KEY,
sender_id   INT,
recepient_id INT,
accepted BOOLEAN DEFAULT false,
user_id INT NOT NULL REFERENCES users(id)
);


INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (1,205,205);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,6,6);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,7,7);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,8,8);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,9,9);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,10,10);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,11,11);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,13,13);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,14,914);

INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (7,205,205);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (20,77,77);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (20,75,75);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (20,84,84);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,93,93);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,104,104);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,113,113);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,143,143);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,14,14);


INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,16,16);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,17,17);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (205,201,201);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,3,3);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,4,4);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (201,203,203);
INSERT INTO friendship (recepient_id, sender_id, user_id) VALUES (202,203,203);
INSERT INTO friendship (recepient_id, sender_id, accepted, user_id) VALUES (201,5, true, 5);
        