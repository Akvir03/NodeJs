const { findOne, find, insertOne, updateOne} = require("../services/db/crud");


async function findUser(req, res, next) {
  try {
    const result = await findOne("User", {"username": req});
    return res.send(result);
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
  findUser, findUsers, insertUser, updateUser, insertWatch
};