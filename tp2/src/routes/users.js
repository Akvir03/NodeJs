const express = require("express");
const router = express.Router();
const { findUser,insertUser,updateUser,findUsers} = require("../controllers/users");

router.get("/findone", findUser);
router.get("/create", insertUser);
router.get("/find", findUsers);
router.get("/update",updateUser);

module.exports = router;