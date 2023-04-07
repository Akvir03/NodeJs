const { findOne, insertOne, updateOne, deleteOne, find } = require("../services/db/crud");
const axios = require("axios").default;
const { getMovieByTitle } = require("../repositories/omdbapi.js");
const { logger } = require("../log");

/**
 * Fonction qui permet d'afficher une watchlist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function affichewatchusers(req, res, next) {
    try {
        const user = await findOne("User", { username: req.query.username });
        if (!user) {
            return res.status(404).send({ Error: `Error, l'utilisateur ${req.query.username} n'existe pas` });
        }
        const watchlists = await find("Watchlist", { user_id: user._id });
        return res.send(watchlists);
    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}

/**
 * Fonction qui permet d'insérer un film dans une watchlist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function insertfilminWatch(req, res, next) {
    try {
        const verif = await findOne("User", { username: req.body.username })
        console.log(verif)
        if (verif) {
            const verifwatch = await findOne("Watchlist", { nom: req.body.nom })
            if (verifwatch) {
                delete req.body.username
                const veriffilm = await findOne("Registre", { Title: req.body.Title })
                if (veriffilm) {
                    let filmapush = {
                        "Title": verifwatch.Title,
                        "statu": req.body.statu,
                    }
                    verifwatch.filmlist.push(filmapush)
                    const result = await updateOne("Watchlist", { "nom": req.body.nom }, { $set: { filmlist: verifwatch.filmlist } })
                    return res.send(result);
                }
                else {
                    const film = await getMovieByTitle(req.body.Title)
                    let filmform = {
                        "Title": film.Title,
                        "Year": film.Year,
                        "Director": film.Director,
                        "Poster": film.Poster
                    }
                    let filmapush = {
                        "Title": filmform.Title,
                        "statu": req.body.statu,
                    }
                    const ajoutregistr = await insertOne("Registre", filmform);
                    verifwatch.filmlist.push(filmapush);
                    const result = await updateOne("Watchlist", { "nom": req.body.nom }, { $set: { filmlist: verifwatch.filmlist } })
                    return res.send(result);
                }


            }
            else {
                return res.status(409).send({ Error: `Error, la watchlist ${req.body.nom} n'existe pas` });

            }

        }
        else {
            return res.status(404).send({ Error: `Error, l'utilisateur ${verif.username} n'existe pas` });

        }


    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}
/**
 * Fonction qui permet de créer une watchlist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function insertWatch(req, res, next) {
    try {
        const verif = await findOne("User", { username: req.query.username })
        console.log(verif)
        if (verif) {
            const verifwatch = await findOne("Watchlist", { nom: req.query.nom })
            if (verifwatch) {
                return res.status(409).send({ Error: `Error, la watchlist ${req.query.nom} existe déja` });
            }
            else {
                req.query.user_id = verif._id
                delete req.query.username
                if (req.query.filmlist == null) {
                    req.query.filmlist = []
                }
                if (req.query.serielist == null) {
                    req.query.serielist = []
                }
                const result = await insertOne("Watchlist", req.query);
                return res.send(result);
            }
        }
        else {
            return res.status(404).send({ Error: `Error, l'utilisateur n'existe pas` });


        }


    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}

/**
 * Fonction qui permet d'afficher une watchlist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function affichewatch(req, res, next) {
    try {
        const watchlist = await findOne("Watchlist", { nom: req.query.nom });
        if (!watchlist) {
            return res.status(404).send({ Error: `Error, la watchlist ${req.query.nom} n'existe pas` });
        }
        return res.send(watchlist.filmlist);
    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}

/**
 * Fonction qui permet de supprimer une watchlist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function suppfromwatch(req, res, next) {
    try {
        const watchlist = await findOne("Watchlist", { nom: req.body.nom })
        if (!watchlist) {
            return res.status(404).send({ Error: `Error, la watchlist ${req.body.nom} n'existe pas` })
        }
        const filmlist = watchlist.filmlist.filter(f => f.Title !== req.body.Title)
        const result = await updateOne("Watchlist", { "nom": req.body.nom }, { $set: { filmlist } })
        return res.send(result);
    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}
/**
 * Fonction qui permet d'ajouter une note à un film dans la watchlit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */
async function notewatch(req, res, next) {
    try {
        const { nom, item, note } = req.body;
        const watchlist = await findOne("Watchlist", { nom });
        if (!watchlist) {
            return res.status(404).send({ Error: `La watchlist ${nom} n'existe pas` });
        }
        const index = watchlist.filmlist.findIndex((film) => film.Title === item);
        if (index === -1) {
            return res.status(404).send({ Error: `Le film ${item} n'existe pas dans la watchlist ${nom}` });
        }
        watchlist.filmlist[index].note = note;
        const result = await updateOne("Watchlist", { nom }, { $set: { filmlist: watchlist.filmlist } });
        return res.send(result);
    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}

/**
 * Fonction qui permet de supprimer une watchlist
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns json
 */

async function suppwatch(req, res, next) {
    try {
        const result = await deleteOne("Watchlist", { "nom": req.body.nom });
        if (result.deletedCount === 0) {
            return res.status(404).send({ Error: `La watchlist ${req.body.nom} n'existe pas` });
        }
        return res.send(result);
    } catch (e) {
        logger.log("error", `${e}`);
        return next(e);
    }
}

module.exports = {
    notewatch, suppwatch, suppfromwatch, insertWatch, insertfilminWatch, affichewatch, affichewatchusers
};