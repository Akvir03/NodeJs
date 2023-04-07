const express = require("express");
const router = express.Router();
const { findUser, insertUser, changeuser, afficheusers } = require("../controllers/users");

router.get("/findone", findUser); //
router.post("/create", insertUser); //
router.get("/users", afficheusers); //
router.post("/changeuser", changeuser); //

module.exports = router;