const express = require("express");
const app = express();
const users = require("./users");
const watchlist = require("./watchlist");
const registre = require("./registre");

app.use(express.json());

const metrics = {
  requestsCount: {},
};
/** Appels permettant d'ouvrir les routes nécessaires au fonctionnement du code */
app.use("/users", users);
app.use("/watchlist", watchlist);
app.use("/registre", registre);

app.get("/", (req, res, next) => {
  return res.send("Hello World !");
});

app.get("/health", (req, res, next) => {
  return res.status(200).json({ status: "healthy" });
});

app.get("/metrics", (req, res, next) => {
  metrics.uptime = `${process.uptime().toFixed(2)} seconds`;
  return res.json(metrics);
});

module.exports = app;
