const { findOne, find, insertOne, updateOne, deleteOne} = require("../services/db/crud");
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
              "Title":verifwatch.Title,
              "statu":req.body.statu,
            }
          verifwatch.filmlist.push(filmapush)
          const result = await updateOne("Watchlist", {"nom": req.body.nom}, {$set : {filmlist:verifwatch.filmlist}})
          return res.send(result);
        }
          else{
          const film = await getMovieByTitle(req.body.Title)
          let filmform = {
            "Title":film.Title,
            "Year":film.Year,
            "Director":film.Director,
            "Poster":film.Poster
          }
          let filmapush = {
            "Title":filmform.Title,
            "statu":req.body.statu,
          }
          const ajoutregistr = await insertOne("Registre", filmform);
          verifwatch.filmlist.push(filmapush);
          const result = await updateOne("Watchlist", {"nom": req.body.nom}, {$set : {filmlist:verifwatch.filmlist}})
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

async function afficheregistre(req, res, next) {
  try {
    const result = await find("Registre", req.query);
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function afficheusers(req, res, next) {
  try {
    const result = await find("User", req.query);
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function affichewatchusers(req, res, next) {
  try {
    const user = await findOne("User", { username: req.query.username });
    if (!user) {
      return res.status(404).send({ Error: `Error, l'utilisateur ${req.query.username} n'existe pas` });
    }
    const watchlists = await find("Watchlist", { user_id: user._id });
    return res.send(watchlists);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function affichewatch(req, res, next) {
  try {
    const watchlist = await findOne("Watchlist", { nom: req.query.nom });
    if (!watchlist) {
      return res.status(404).send({ Error: `Error, la watchlist ${req.query.nom} n'existe pas` });
    }
    return res.send(watchlist.filmlist);
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
    const result = await updateOne("User", {"name": req.name}, {$set : {name : req.newname}});
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function suppfromwatch(req, res, next) {
  try {
    const watchlist = await findOne("Watchlist", {nom: req.body.nom})
    if (!watchlist) {
      return res.status(404).send({Error: `Error, la watchlist ${req.body.nom} n'existe pas`})
    }
    const filmlist = watchlist.filmlist.filter(f => f.Title !== req.body.Title)
    const result = await updateOne("Watchlist", {"nom": req.body.nom}, {$set : {filmlist}})
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

async function changeuser(req, res, next) {
  try {
    const user = await findOne("User", {username: req.body.username})
    if (!user) {
      return res.status(404).send({Error: `Error, l'utilisateur ${req.body.username} n'existe pas`})
    }
    const result = await updateOne("User", {"username": req.body.username}, {$set : req.body})
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

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
    console.log(e);
    return next(e);
  }
}



async function suppwatch(req,res,next) {
  try {
    const result = await deleteOne("Watchlist", {"nom": req.body.nom});
    if (result.deletedCount === 0) {
      return res.status(404).send({Error: `La watchlist ${req.body.nom} n'existe pas`});
    }
    return res.send(result);
  } catch (e) {
    console.log(e);
    return next(e);
  }
}

module.exports = {
  findUser, findUsers,notewatch,suppwatch,insertUser,suppfromwatch, changeuser, updateUser, insertWatch, insertfilminWatch, insertfilminregistre, afficheregistre, afficheusers, affichewatchusers, affichewatch
};