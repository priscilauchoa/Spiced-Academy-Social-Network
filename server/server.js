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

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

// const {
//     // requireLoggedOutUser,
//     // requireLoggedInUser,
// } = require("./middleware");

const cookieSessionMiddleware = cookieSession({
    secret: SESS_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(cookieSessionMiddleware);

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
    // console.log("session id-->", req.session.userId);
    db.getUser(req.session.userId).then(({ rows }) => {
        // console.log(rows[0].profile_pic);
        res.json({ rows });
    });
});

app.get("/api/user/:id", function (req, res) {
    if (req.session.userId == req.params.id) {
        res.json({ sucess: false });
    } else {
        db.getUser(req.params.id).then(({ rows }) => {
            if (rows[0]) {
                console.log(rows[0]);
                res.json({ rows, sucess: true });
            } else {
                res.json({ sucess: false });
            }
        });
    }
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
                            "New password Priscila Flores"
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
                    // console.log("correct code");
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
            // console.log("error verify code secret", err);
            res.json({ success: false });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    let url = `https://s3.amazonaws.com/priscilasbucket/${req.file.filename}`;

    db.changeProfilePic(req.session.userId, url)
        .then(({ rows }) => {
            // console.log("rows****", rows);
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
        // console.log(rows[0].bio);
        res.json(rows[0]);
    });
});

app.get("/users", function (req, res) {
    db.getUsers(req.session.userId).then(({ rows }) => {
        // console.log({ rows });
        res.json({ rows });
    });
});

app.get("/friendsandwannabee", function (req, res) {
    db.getFriendsAndWannaBees(req.session.userId).then(({ rows }) => {
        console.log("friends and wanna be", rows);
        res.json({ rows });
    });
});

app.post("/friendsandwannabee", function (req, res) {
    db.acceptFriendshipRequest(req.session.userId, req.body.id).then(
        ({ rows }) => {
            console.log("friends and wanna be", rows);
            res.json({ success: true }).status(200);
        }
    );
});

app.post("/friendsandwannabee/unfriend", function (req, res) {
    // console.log("id unfriend--->", req.session.userId, req.body.id);
    db.removeFriendship(req.session.userId, req.body.id).then(({ rows }) => {
        console.log("friends and wanna be", rows);
        res.json({ success: true }).status(200);
    });
});

app.post("/delete-user", function (req, res) {
    db.deleteChat(req.session.userId)
        .then(() => {
            console.log("session: ", req.session.userId);
        })
        .then(() => {
            db.deleteFriendship(req.session.userId);
        })
        .then(() => {
            db.deleteUser(req.session.userId);
        })
        .then(() => {
            req.session = null;
            res.json({ success: true }).status(200);
        })
        .catch((error) => console.log(error));
});

app.get("/users/:search", function (req, res) {
    console.log("req.params.search", req.params.search);
    db.getUsers(req.session.userId, req.params.search).then(({ rows }) => {
        // console.log({ rows });
        res.json({ rows });
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

app.post("/friendship-status", function (req, res) {
    console.log("***", req.session.userId, req.body.otherUser);
    const { otherUserId, action } = req.body;
    const { userId } = req.session;
    const status = action === "accept" ? true : false;

    let dbFunc = db.acceptFriendshipRequest;
    if (action === "request") {
        dbFunc = db.insertFriendship;
    } else if (action === "cancel" || action === "unfriend") {
        dbFunc = db.removeFriendship;
    }
    dbFunc(userId, otherUserId, status)
        .then(({ rows }) => {
            if (rows.length && rows[0]) {
                console.log(rows[0]);
                res.json(rows[0]);
            } else {
                throw new Error("No rows updated");
            }
        })
        .catch(() => {
            res.json({ success: false }).status(500);
        });
});

app.get("/friendship/:otherUserId", function (req, res) {
    console.log(
        "req.session.userId, req.params.otherUserId",
        req.session.userId,
        req.params.otherUserId
    );
    db.getFriendship(req.session.userId, req.params.otherUserId).then(
        ({ rows }) => {
            console.log("friendship", rows);

            const response = rows.map((row) => {
                let action;
                if (row.accepted) {
                    action = "unfriend";
                } else {
                    action =
                        row.sender_id === req.session.userId
                            ? "cancel"
                            : "accept";
                }

                return {
                    ...row,
                    action,
                };
            });
            res.json({ rows: response });
        }
    );
});
// app.get("/messages", function (req, res) {

// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

let onlineUsers = [];

io.on("connection", async function (socket) {
    console.log("NEW CONNECTION");

    const userId = socket.request.session.userId;
    console.log("userId", userId);

    onlineUsers.push(userId);

    if (userId) {
        //1- send last 10 messages
        //1.a -
        socket.emit("online-users", {
            onlineUsers: onlineUsers,
        });

        db.getMessages().then(({ rows }) => {
            socket.emit("last-10-messages", {
                messages: rows,
            });
        });

        socket.on("message", (data) => {
            console.log("data", data);
            db.insertMessage(userId, data.message).then(({ rows }) => {
                console.log(rows);
                io.emit("message-broadcast", rows[0]);
            });
        });
    } else if (!userId) {
        return socket.disconnect(true);
    }
});
