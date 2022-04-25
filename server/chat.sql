
DROP TABLE IF EXISTS chats;

CREATE TABLE chats(
id          SERIAL PRIMARY KEY,
message     TEXT NOT NULL,
from_id     INT NOT NULL,
to_id       INT,
user_id     INT NOT NULL REFERENCES users(id),
created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELETE users
FROM users
INNER JOIN chats
ON users.id = chats.user_id
WHERE users.id = 1



-- DELETE users, chats 
-- FROM users, chats 
-- WHERE users.id = 3
-- AND users.id = chats.user_id;

INSERT INTO chats (from_id, message, user_id) VALUES (201,'Oláaa 😄 ', 5);