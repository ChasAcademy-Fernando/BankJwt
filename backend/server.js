import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4001;

const users = [];
const accounts = [];

let userIds = 1;
let money = 1;

app.post("/users", (req, res) => {
  const user = req.body;
  user.id = userIds++;
  users.push(user);
  user.mon = money++
  const account = {
    money: user.mon,
    userId: user.id,
  };
  accounts.push(account);

  console.log(user);

  res.statusCode = 200;
  res.send("ok");
});


const secret =
  "bf837edc3ce4bd375ea983df38535b26fbbd640966e0a81e99aab19e4b7ecd57efe61336dc5ece1d5302490e72cb7a873d1b1ccfe2af1500cb6feb6fbdce4644";

function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}

app.post("/sessions", (req, res) => {
  const user = req.body;
  const dbUser = users.find((u) => u.username == user.username);

  if (dbUser != null && dbUser.password == user.password) {
    const token = generateAccessToken(dbUser.id);

    res.json({ token });
  } else {
    res.status = 401;
    res.json();
  }
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  

  const userAcc = accounts.filter(account => account.userId == req.userId)
  
  console.log("userId: "+ req.userId + " this is user account" + userAcc );
  res.json({ userId: req.userId, userAcc: userAcc });
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
