const express = require("express");
const app = express();
const dbconnect = require("./db/connect");
const passport = require("passport");
const passportSetup = require('./services/passport-setup')
require("dotenv").config();

const authRoutes = require('./routes/auth-routes')


app.use('/auth',authRoutes);


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
