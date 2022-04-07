const express = require("express");
const app = express();
const compression = require("compression");

const cookieSession = require("cookie-session");
const { compare, hash } = require("./bc");
const { SESS_SECRET } = require("../secrets.json");

const path = require("path");
const db = require("./db");
const {
    // requireLoggedOutUser,
    requireLoggedInUser,
} = require("./middleware");

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
            .catch((err) => {
                console.log(err);
                res.json({ success: false });
            });
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.post("/login.json", function (req, res) {
    console.log("émail aqui", req.body.email);
    db.authenticateUser(req.body.email)
        .then(({ rows }) => {
            console.log("rORWS BEFORE", rows);
            compare(req.body.password, rows[0].password).then(() => {
                console.log("rORWS after", rows);

                req.session.userId = rows[0].id;
                res.json({ success: true });
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false });
        });
});

app.get("/user/id.json", function (req, res) {
    console.log(req.session.userId);
    console.log("session id-->", req.session.userId);
    res.json({
        userId: req.session.userId,
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
