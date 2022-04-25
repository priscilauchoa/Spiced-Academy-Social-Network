
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
ON users.chats. = [table2].[joining column]
WHERE [condition]



INSERT INTO chats (from_id, message, user_id) VALUES (201,'Oláaa 😄 ', 5);