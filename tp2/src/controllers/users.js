const { findOne, find, insertOne, updateOne} = require("../services/db/crud");
const axios = require("axios").default;
const { getMovieByTitle} = require("../repositories/omdbapi.js");

async function findUser(req, res, next) {
  try {
    const result = await findOne("User", {"username": req});
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function insertfilminWatch(req,res,next){
  try {
    const verif = await findOne("User", {username: req.body.username})
    console.log(verif)
    if (verif) {
      const verifwatch = await findOne("Watchlist",{nom: req.body.nom})
      if(verifwatch){
        delete req.body.username
          const veriffilm = await findOne("Registre",{Title: req.body.Title})
          if(veriffilm){
            let filmapush = {
              "Title":req.body.Title,
              "statu":req.body.statu,
            }
          verifwatch.filmlist.push(filmapush)
          const result = await updateOne("Watchlist", {"filmlist":verifwatch.filmlist}, {$set : {filmlist:verifwatch.filmlist}})
          return res.send(result);
        }
          else{
          const film = await getMovieByTitle(req.body.Title)
          let filmform = {
            "Title":film.Title,
            "statu":req.body.statu,
          }
          const ajoutregistr = await insertOne("Registre", filmform);
          verifwatch.filmlist.push(filmform);
          const result = await updateOne("Watchlist", {"filmlist":verifwatch.filmlist}, {$set : {filmlist:verifwatch.filmlist}})
          return res.send(result);
        }
        
        
      }
      else{
        return res.status(409).send({Error: `Error, la watchlist ${req.body.nom} n'existe pas`});
        
      }
      
    }
    else{
      return res.status(404).send({Error: `Error, l'utilisateur ${verif.username} n'existe pas`});
      
    }
      
    
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function insertWatch(req,res,next){
  try {
    const verif = await findOne("User", {username: req.body.username})
    console.log(verif)
    if (verif) {
      const verifwatch = await findOne("Watchlist",{nom: req.body.nom})
      if(verifwatch){
        return res.status(409).send({Error: `Error, la watchlist ${req.body.nom} existe déja`});
      }
      else{
        req.body.user_id=verif._id
        delete req.body.username
        if(req.body.filmlist==null){
          req.body.filmlist=[]
        }
        if(req.body.serielist==null){
          req.body.serielist=[]
        }
        const result = await insertOne("Watchlist", req.body);
        return res.send(result);
      }
    }
    else{
      return res.status(404).send({Error: `Error, l'utilisateur n'existe pas`});
      
      
    }
      
    
  } catch (e) {
    console.log(e);
    return next(e);
  }
}
async function insertfilminregistre(req,res,next){
    try {
        const veriffilm = await findOne("Registre",{Title: req.body.Title})
        if(veriffilm){
          return res.status(409).send({Error: `Error, le film ${req.body.Title} existe déja`});
        }
        else{
          const film = await getMovieByTitle(req.body.Title)
          let filmform = {
            "Title":film.Title,
            "Year":film.Year,
            "Director":film.Director,
            "Poster":film.Poster
          }
          const result = await insertOne("Registre", filmform);
          return res.send(result);
        }
        
      }          
      catch (e) {
      console.log(e);
      return next(e);
    }
  }


async function findUsers(req, res, next) {
  try {
    const result = await find("User", {"nom": req.body.nom});
    console.log(res.body)
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function insertUser(req, res, next) {
  try {
    const verif = await findOne("User", {username: req.body.username})
    console.log(verif)
    if (verif) {
      return res.status(409).send({Error: `Error, l'utilisateur ${verif.username} existe déja`});
    }
    else{
      const result = await insertOne("User", req.body);
      return res.send(result);
    }
      
    
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function updateUser(req, res, next) {
  try {
    const result = await updateOne("User", {"name": "Paul"}, {$set : {name : "Paulo"}});
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

module.exports = {
  findUser, findUsers, insertUser, updateUser, insertWatch, insertfilminWatch, insertfilminregistre
};