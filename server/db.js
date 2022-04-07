const spicedPg = require("spiced-pg");

const db = spicedPg(`postgres:postgres:postgres@localhost:5432/network`);

exports.registerUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4)
        RETURNING id`,
        [first, last, email, password]
    );
};
exports.registerCode = (code, email) => {
    return db.query(`INSERT INTO reset_codes (code, email) VALUES ($1, $2)`, [
        code,
        email,
    ]);
};
exports.getCode = () => {
    return db.query(
        `SELECT * FROM reset_codes
WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`
    );
};

exports.authenticateUser = (email) => {
    return db.query(`SELECT * FROM users WHERE users.email = $1`, [email]);
};
