const axios = require("axios").default;
const conf = require("../../conf.json")
// Utilisation de la clé api
const apikey = conf.apikey

async function getMovieByTitle(title) {
    const options = {
        method: "GET",
        url: "http://www.omdbapi.com/",
        params: {t: title, apikey: apikey},
    };

    try {
        const result = await axios.request(options);
        return result.data;
    }
    catch (e){
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