const { getCollection } = require("./connection");


async function findOne(collectionName, query, options = {}) {
  try {
    const collection = getCollection(collectionName);
    const result = await collection.findOne(query, options);
    return result;
  } catch (e) {
    console.log(
      `Erreur lors de l execution de la fonction findOne avec les parametres suivants: ${query}`
    );
    console.log(e);
    throw e;
  }
}

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
