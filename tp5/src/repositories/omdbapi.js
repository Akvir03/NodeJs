const axios = require("axios").default;
const conf = require("../../conf.json")
const apikey = conf.apikey
/**
 * Fonction qui permet de récupérer un film par son titre depuis l'API OMDBAPI
 * @param {string} title 
 * @returns JSON
 */
async function getMovieByTitle(title) {
    const options = {
        method: "GET",
        url: "http://www.omdbapi.com/",
        params: { t: title, apikey: apikey },
    };

    try {
        const result = await axios.request(options);
        return result.data;
    }
    catch (e) {
        console.error(e);
    }
    /*.then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.error(error);
    });*/
}

module.exports = {
    getMovieByTitle,
}