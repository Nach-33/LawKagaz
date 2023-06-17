const express = require("express");
const app = express();
const dbconnect = require("./db/connect");
const passport = require("passport");
const passportSetup = require("./services/passport-setup");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth-routes");
require("dotenv").config();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["nacho5Ame5owe"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);


const port = process.env.PORT || 4000;
const url = process.env.MONGO_URI;
const start = async () => {
  try {
    await dbconnect(url);
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
