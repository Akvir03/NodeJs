const express = require("express");
const router = express.Router();
const { insertfilminregistre, afficheregistre, affichefilm } = require("../controllers/registre");


router.post("/insertfilm", insertfilminregistre) //
router.get("/registre", afficheregistre); //
router.get("/affilm", affichefilm); //

module.exports = router;