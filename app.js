const express = require("express");
const app = express();
const dbconnect = require("./db/connect");
const passport = require("passport");
const passportSetup = require("./services/passport-setup");
const cors = require('cors')
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth-routes");
const postRoutes = require("./routes/posts-routes");
const userRoutes = require("./routes/user-routes");
require("dotenv").config();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const frontendUri = process.env.FRONTEND_URI
app.enable("trust proxy");
app.use(
  cors({
    credentials: true,
    origin: frontendUri,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/user", userRoutes);

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
