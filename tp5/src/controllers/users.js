const { findOne, find, insertOne, updateOne } = require("../services/db/crud");
const { logger } = require("../log");

/**
 * Fonction qui permet de trouver un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function findUser(req, res, next) {
  try {
    const result = await findOne("User", req.query);
    return res.send(result);
  } catch (e) {
    logger.log("error", `${e}`)
    return next(e);
  }
}

/**
 * Fonction qui retourne tous les utilisateurs
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function afficheusers(req, res, next) {
  try {
    const result = await find("User", req.query);
    return res.send(result);
  } catch (e) {
    logger.log("error", `${e}`)
    return next(e);
  }
}


/**
 * Fonction qui insert un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function insertUser(req, res, next) {
  try {
    const verif = await findOne("User", { username: req.query.username })
    console.log(verif)
    if (verif) {
      return res.status(409).send({ Error: `Error, l'utilisateur ${verif.username} existe déja` });
    }
    else {
      const result = await insertOne("User", req.query);
      return res.send(result);
    }


  } catch (e) {
    logger.log("error", `${e}`)
    return next(e);
  }
}

/**
 * Fonction qui permet de modifier un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function changeuser(req, res, next) {
  try {
    const user = await findOne("User", { username: req.query.username })
    if (!user) {
      return res.status(404).send({ Error: `Error, l'utilisateur ${req.query.username} n'existe pas` })
    }
    const result = await updateOne("User", { "username": req.query.username }, { $set: req.query })
    return res.send(result);
  } catch (e) {
    logger.log("error", `${e}`)
    return next(e);
  }
}


module.exports = {
  findUser, insertUser, changeuser, afficheusers
};