const express = require("express");
const router = express.Router();
const { findUser,insertUser,suppfromwatch,notewatch,suppwatch,changeuser,updateUser,findUsers,insertWatch, insertfilminWatch, insertfilminregistre, afficheregistre, afficheusers, affichewatchusers, affichewatch} = require("../controllers/users");

router.get("/findone", findUser);
router.post("/create", insertUser);
router.get("/find", findUsers);
router.post("/update",updateUser);
router.post("/createwatchlist", insertWatch);
router.post("/insertfilminwatchlist",insertfilminWatch);
router.post("/insertfilm",insertfilminregistre)
router.get("/registre", afficheregistre);
router.get("/users", afficheusers);
router.get("/watchlists", affichewatchusers);
router.get("/watchlist", affichewatch);
router.post("/suppfromwatch",suppfromwatch);
router.post("/chargeuser",changeuser);
router.post("/notewatch",notewatch);
router.post("/suppwatch",suppwatch);
module.exports = router;