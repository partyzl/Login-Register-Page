const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./Controllers/auth");
const userRoutes = require("./Controllers/user");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) =>
  res.status(200).send("Welcome!")
);

module.exports = app;