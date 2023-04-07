const express = require("express");
const router = express.Router();
const { findUser, insertUser, changeuser, afficheusers } = require("../controllers/users");

/**Les différentes sous-routes(/users/X) utiles à l'API */
router.get("/findone", findUser); //
router.post("/create", insertUser); //
router.get("/users", afficheusers); //
router.post("/changeuser", changeuser); //

module.exports = router;