const express = require("express");
const app = express();
const compression = require("compression");

const cookieSession = require("cookie-session");
const { compare, hash } = require("./bc");
const { SESS_SECRET } = require("../secrets.json");
const ses = require("./ses.js");

const path = require("path");
const db = require("./db");
const { uploader } = require("./upload");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3");

// const {
//     // requireLoggedOutUser,
//     // requireLoggedInUser,
// } = require("./middleware");

app.use(
    cookieSession({
        secret: SESS_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.post("/register.json", (req, res) => {
    hash(req.body.password).then((hashedPassword) => {
        db.registerUser(
            req.body.first,
            req.body.last,
            req.body.email,
            hashedPassword
        )
            .then(({ rows }) => {
                req.session.userId = rows[0].id;
                res.json({ success: true });
            })
            .catch(() => {
                // console.log(err);
                res.json({ success: false });
            });
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.post("/login.json", function (req, res) {
    db.authenticateUser(req.body.email)
        .then(({ rows }) => {
            // console.log("rORWS BEFORE", rows);
            compare(req.body.password, rows[0].password).then(() => {
                // console.log("rORWS after", rows);

                req.session.userId = rows[0].id;
                res.json({ success: true });
            });
        })
        .catch(() => {
            // console.log(err);
            res.json({ success: false });
        });
});

app.get("/user/id.json", function (req, res) {
    // console.log(req.session.userId);
    // console.log("session id-->", req.session.userId);
    res.json({
        userId: req.session.userId,
    });
});

app.get("/user", function (req, res) {
    // console.log(req.session.userId);
    console.log("session id-->", req.session.userId);
    db.getUser(req.session.userId).then(({ rows }) => {
        console.log(rows[0].profile_pic);
        res.json({ rows });
    });
});

app.post("/password/reset/start", (req, res) => {
    console.log("req.params", req.body.email);
    db.authenticateUser(req.body.email)
        .then(({ rows }) => {
            console.log("Users-->", rows);
            if (!rows.length) {
                console.log("user does not exist");
            } else {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.registerCode(req.body.email, secretCode)
                    .then(() => {
                        ses.sendEmail(
                            `Reset your password ${secretCode} `,
                            "New password"
                        );
                    })
                    .then(() => res.json({ success: true }));
            }
        })
        .catch((err) => {
            console.log("error", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("req.params", req.body.code);
    db.getCode()
        .then(({ rows }) => {
            console.log(rows[0].email);

            for (let i = 0; i < rows.length; i++) {
                if (rows[i].code == req.body.code) {
                    console.log("correct code");
                    hash(req.body.password)
                        .then((hashedPassword) => {
                            db.resetPassword(
                                req.session.userId,
                                hashedPassword
                            );
                        })
                        .then(() => {
                            res.json({ success: true });
                        });
                }
            }
            // console.log("no code found");
            // res.json({ success: false });
        })
        .catch((err) => {
            console.log("error verify code secret", err);
            res.json({ success: false });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    let url = `https://s3.amazonaws.com/priscilasbucket/${req.file.filename}`;

    db.changeProfilePic(req.session.userId, url)
        .then(({ rows }) => {
            console.log("rows****", rows);
            // res.json({ url });
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error verify code secret", err);
            res.json({ success: false });
        });
});

app.get("/bio", function (req, res) {
    // console.log(req.session.userId);
    console.log("session id-->", req.session.userId);
    db.getUser(req.session.userId).then(({ rows }) => {
        console.log(rows[0].bio);
        res.json(rows[0]);
    });
});

app.post("/bio", (req, res) => {
    console.log("bio no server", req.body.draftBio);
    db.insertBio(req.session.userId, req.body.draftBio)
        .then(({ rows }) => {
            res.json({ rows });
        })
        .catch((err) => {
            console.log("error saving BIO", err);
            res.json({ success: false });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
