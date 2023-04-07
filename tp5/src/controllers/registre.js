const { findOne, find, insertOne } = require("../services/db/crud");
const axios = require("axios").default;
const { getMovieByTitle } = require("../repositories/omdbapi.js");
const { logger } = require("../log");

/**
 * Fonction pour insérer un film au registre
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function insertfilminregistre(req, res, next) {
    try {
        const veriffilm = await findOne("Registre", { Title: req.query.Title })
        if (veriffilm) {
            return res.status(409).send({ Error: `Error, le film ${req.query.Title} existe déja` });
        }
        else {
            const film = await getMovieByTitle(req.query.Title)
            let filmform = {
                "Title": film.Title,
                "Year": film.Year,
                "Director": film.Director,
                "Poster": film.Poster
            }
            const result = await insertOne("Registre", filmform);
            return res.send(result);
        }

    }
    catch (e) {
        logger.log("error", `${e}`)
        return next(e);
    }
}

/**
 * Fonction pour afficher tous les films du registre
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function afficheregistre(req, res, next) {
    try {
        const result = await find("Registre", req.query);
        return res.send(result);
    } catch (e) {
        logger.log("error", `${e}`)
        return next(e);
    }
}
/**
 * Fonction pour afficher un film du registre
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function affichefilm(req, res, next) {
    try {
        const result = await findOne("Registre", req.query);
        return res.send(result);
    } catch (e) {
        logger.log("error", `${e}`)
        return next(e);
    }
}
module.exports = {
    insertfilminregistre, afficheregistre, affichefilm
};