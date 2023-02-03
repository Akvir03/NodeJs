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

async function findUsers(req, res, next) {
  try {
    const result = await find("User", {"nom": req.nom});
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
  findUser, findUsers, insertUser, updateUser
};