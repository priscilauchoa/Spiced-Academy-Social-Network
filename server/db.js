const spicedPg = require("spiced-pg");

const db = spicedPg(`postgres:postgres:postgres@localhost:5432/network`);

exports.registerUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, password]
    );
};
exports.registerCode = (email, code) => {
    return db.query(`INSERT INTO reset_codes (code, email) VALUES ($1, $2)`, [
        code,
        email,
    ]);
};
exports.changeProfilePic = (id, profilePic) => {
    return db.query(
        `UPDATE users
SET profile_pic = $2
WHERE users.id = $1 RETURNING profile_pic AS url`,
        [id, profilePic]
    );
};

exports.getCode = () => {
    return db.query(
        `SELECT * FROM reset_codes
WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes';`
    );
};

exports.getUser = (id) => {
    return db.query(
        `SELECT * FROM users
WHERE id = $1;`,
        [id]
    );
};

exports.getUsers = (id, search) => {
    let queryUser = "SELECT * FROM users WHERE id <> $1";
    let paramsUser = [id];
    if (search) {
        queryUser += " AND first ILIKE $2";
        paramsUser.push(search + "%");
    } else {
        queryUser += " LIMIT 4";
    }
    return db.query(queryUser, paramsUser);
};

exports.authenticateUser = (email) => {
    return db.query(`SELECT * FROM users WHERE users.email = $1`, [email]);
};

exports.resetPassword = (userId, newPassword) => {
    return db.query(
        `UPDATE users
SET password = $2
WHERE users.id = $1;`,
        [userId, newPassword]
    );
};

exports.insertBio = (userId, bio) => {
    return db.query(
        `UPDATE users
SET bio = $2
WHERE users.id = $1 RETURNING bio as draftBio;`,
        [userId, bio]
    );
};

exports.insertFriendship = (userId, otherUserId) => {
    return db.query(
        `INSERT INTO friendship (sender_id, recepient_id, user_id) VALUES ($1, $2, $1) RETURNING sender_id, recepient_id, accepted`,
        [userId, otherUserId]
    );
};

exports.getFriendship = (currentUserId, otherUserId) => {
    return db.query(
        `SELECT * FROM friendship
         WHERE (recepient_id = $1 AND sender_id = $2)
         OR (recepient_id = $2 AND sender_id = $1)`,
        [currentUserId, otherUserId]
    );
};
exports.getMessages = () => {
    // return db.query("SELECT * FROM chats ORDER BY id DESC LIMIT 10");
    return db.query(`SELECT chats.id AS message_id, chats.user_id AS user_id, first, last, profile_pic, message
            FROM chats
            JOIN users
            ON chats.user_id = users.id
            ORDER BY chats.id DESC
            LIMIT 10`);
};
exports.insertMessage = (id, message) => {
    return db.query(
        "INSERT INTO chats (from_id, message, user_id) VALUES ($1, $2, $1) RETURNING *",
        [id, message]
    );
};

// exports.insertMessage = (message, user_id) => {
//     return db.query(
//         `WITH “user”
//         AS ( SELECT * FROM users WHERE id = $2),
//         message AS (INSERT INTO chats (message, user_id, from_id) VALUES ($1, $2, $2) RETURNING message, user_id)
//         SELECT first, last, profile_pic, message, user_id FROM “user”, message`,
//         [message, user_id]
//     );
// };

exports.acceptFriendshipRequest = (userId, otherUserId) => {
    return db.query(
        `UPDATE friendship
        SET accepted = true
        WHERE recepient_id = $1 AND sender_id = $2 RETURNING sender_id, recepient_id, accepted`,
        [userId, otherUserId]
    );
};

exports.removeFriendship = (userId, otherUserId) => {
    return db.query(
        `DELETE FROM friendship
        WHERE (recepient_id = $2 AND sender_id = $1) OR (recepient_id = $1 AND sender_id = $2)`,
        [userId, otherUserId]
    );
};

exports.deleteUser = (userId) => {
    return db.query(`DELETE from users WHERE id = $1`, [userId]);
};

exports.deleteChat = (userId) => {
    return db.query(
        `
      DELETE from chats WHERE user_id = $1`,
        [userId]
    );
};
exports.deleteFriendship = (userId) => {
    return db.query(
        `DELETE from friendship WHERE user_id = $1 OR recepient_id = $1
  `,
        [userId]
    );
};

exports.getFriendsAndWannaBees = (userId) => {
    return db.query(
        `SELECT users.id, first, last, profile_pic, accepted
  FROM friendship
  JOIN users
  ON (accepted = false AND recepient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND recepient_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND recepient_id = users.id)`,
        [userId]
    );
};

// DELETE users FROM users JOIN chats ON chats.user_id = users.id WHERE users.id = 1;

// DELETE users.*, chats.*
// FROM chats
// LEFT JOIN users
// ON chats.user_id = users.id
// WHERE user.id = 1
