const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./controllers/auth");
const userRoutes = require("./routes/users");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) =>
  res.status(200).send("Welcome!")
);

module.exports = app;