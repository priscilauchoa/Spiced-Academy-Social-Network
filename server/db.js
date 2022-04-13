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
