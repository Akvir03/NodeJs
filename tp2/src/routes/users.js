const express = require("express");
const router = express.Router();
const { findUser,insertUser,updateUser,findUsers,insertWatch, insertfilminWatch, insertfilminregistre} = require("../controllers/users");

router.get("/findone", findUser);
router.post("/create", insertUser);
router.get("/find", findUsers);
router.post("/update",updateUser);
router.post("/createwatchlist", insertWatch);
router.post("/insertfilminwatchlist",insertfilminWatch);
router.post("/insertfilm",insertfilminregistre)

module.exports = router;