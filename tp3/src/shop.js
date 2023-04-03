const { indexOf } = require("lodash")
const prod  = require("./products.json")


/**
 * @function
 * @param {number} id, id de l'utilisateur a rechercher
 * @param {Array} usersData, tableau contenant la liste des utilisateurs 
 * Retourne les données de l'utilisateur de la liste qui correpondant à l'id 
 */
function getUser(id, usersData) {
  // implentez la fonction
  if(id<1 || typeof(id)!=typeof(42)){
    throw new Error("L'identifiant doit être un entier positif")
  }
  else{
    if(usersData[id-1]==null && usersData.length>0){
        var message = `L'utilisateur ${id} n'existe pas!`
        throw new Error(message)
    }
    else{
      if(usersData.length==0){ 
        throw new Error(`"La liste des utilisateur est vide"`)
      }
      else{
        if(typeof(usersData)!=typeof([])){
          throw new Error(`La liste des utilisateur doit être un tableau contenant des utilisateurs`)
        }
        else{
          return usersData[id-1]
        }
      }
    }   
  }  
}


/**
 * @function
 * @param {Array} usersData, tableau contenant la liste des utilisateurs 
 * Retourne la liste des numéros de téléphone des utilisateurs de 50 ans ou plus 
 */
function getNumber50plus(usersData) {
  listenum = []
  if(usersData.length==0){
    throw new Error(`La liste des utilisateur est vide`)
  }
  if(typeof(usersData)!=typeof([])){
    throw new Error(`La liste des utilisateur doit être un tableau contenant des utilisateurs`)
  }
  for (i=0;i<usersData.length;i++){
    if(usersData[i].age>=50){
      listenum.push(usersData[i].phone)
    }
  }
  return listenum
}

/**
 * @function
 * @param {Array} productsData, tableau contenant la liste des produits
 * @param {String} categ, nom de la catégorie de produit
 * Retourne le libellé du produit et son stock appartenant à la catégorie donnée
 */
function libstockprod(productsData,categ){
  listeprodcat = []
  if(typeof(categ)!=typeof("test")){
    throw new Error(`Le type de la catégorie est erronné`)
  }
  if(productsData.length==0){
    throw new Error(`La liste des produits est vide`)
  }
  if(typeof(productsData)!=typeof([])){
    throw new Error(`La liste des produits doit être un tableau contenant des produits`)
  }
  for (i=0;i<productsData.length;i++){
    if(productsData[i].category==categ){
      if(productsData[i].stock<10){
        listeprodcat.push({titre:productsData[i].title,stock:"Low"})
      }
      if(10<=productsData[i].stock<50){
        listeprodcat.push({titre:productsData[i].title,stock:"Medium"})
      }
      if(productsData[i].stock>50){
        listeprodcat.push({titre:productsData[i].title,stock:"High"})
      }
    }
  }
  
  
  return listeprodcat
}

/**
 * @function
 * @param {Array} productsData, tableau contenant la liste des produits
 * Trie par catégorie les libellés et les stocks des produits
 */
function stockallprod(productsData){
  listecat = []
  res = {}
  productsData.forEach(element => {
    if(!res[element.category]){
      res[element.category]= libstockprod(productsData,element.category)
    }
    
  });
  return res
}

//console.log(libstockprod(prod,"smartphones"))
//console.log(stockallprod(prod))

module.exports = {
  getUser,getNumber50plus,libstockprod,stockallprod
};
