
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const { application_name } = require("pg/lib/defaults");

// call the function
const app = express();
app.use(bodyParser.json());

// middleaware - to enable cors at server-side
app.use((req, res, next) => {
  console.log("within cors configuration middleware");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

// a base url - localhost:3000
// get('url', callback function)
app.get("/", (req, res) => {
  res.json({ info: "GET - response - Node, express, postgres ready... " });
});

// define more URL
app.get("/cakeshop/login", db.getUsers);
app.get("/cakeshop/login:id", db.getUsersById);
app.post("cakeshop/login", db.postUsers);

const port = 3000;
app.listen(port, () => {
  console.log("Web server is listening on port 3000 ");
});
