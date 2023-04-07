const { getCollection } = require("./connection");

/**
 * Fonction permettant de trouver un élément dans une collection
 * @param {*} collectionName 
 * @param {*} query 
 * @param {*} options 
 * @returns json
 */
async function findOne(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const result = await collection.findOne(query, options);
    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${JSON.stringify(query)}`
    );
    console.log(e);
    throw e;
  }
}
/**
 * Permet de récupérer tous les éléments dans une collection MONGO
 * @param {*} collectionName 
 * @param {*} query 
 * @param {*} options 
 * @returns JSON
 */
async function find(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const cursor = await collection.find(query, options);
    const result = []
    await cursor.forEach((item) => result.push(item))
    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction find avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}
/**
 * Permet d'insérer un élément dans une collection MONGO
 * @param {*} collectionName 
 * @param {*} query 
 * @param {*} doc 
 * @returns JSON
 */
async function insertOne(collectionName, query, doc) {
  try {
    const collection = getCollection(collectionName);
    const result = await collection.insertOne(query, doc);
    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction insertOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

/**
 * Permet de modifier un élément dans une collection Mongo
 * @param {*} collectionName 
 * @param {*} query 
 * @param {*} filter 
 * @param {*} updateDoc 
 * @param {*} options 
 * @returns JSON
 */
async function updateOne(collectionName, query, filter, updateDoc, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const result = await collection.updateOne(query, filter, updateDoc, options);
    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction updateOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}
/**
 * Permet de supprimer un élément d'une collection MONGO
 * @param {*} collectionName 
 * @param {*} query 
 * @param {*} options 
 * @returns JSON
 */
async function deleteOne(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const result = await collection.deleteOne(query, options);
    return result;
  } catch (e) {
    console.log(`Erreur lors de l'exécution de la fonction deleteOne avec les paramètres suivants: ${query}`);
    console.log(e);
    throw e;
  }
}

module.exports = {
  findOne, find, insertOne, updateOne, deleteOne
};
