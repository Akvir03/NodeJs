const express = require("express");
const router = express.Router();
const { suppfromwatch, notewatch, suppwatch, insertWatch, insertfilminWatch, affichewatch } = require("../controllers/watchlist");



router.post("/createwatchlist", insertWatch); //
router.post("/insertfilminwatchlist", insertfilminWatch); //
router.get("/watchlist", affichewatch); //
router.post("/suppfromwatch", suppfromwatch);//
router.post("/notewatch", notewatch); //
router.post("/suppwatch", suppwatch); //
module.exports = router;