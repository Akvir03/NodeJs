/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne la somme de a et b
 */
function addition(a, b) {
  // implentez la fonction
  if(typeof(a)!=typeof(42) || typeof(b)!=typeof(42)){
    throw new Error("Mauvais type!")
  }
  else{
    return a+b
  }
  
}

/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne le quotient de a et b
 */
function quotient(a, b) {
  // implentez la fonction
  if(typeof(a)!=typeof(42 || typeof(b)!=typeof(42))){
    throw new Error("Mauvais type!")
  }
  else{
    if(b==0){
      throw new Error("Il est impossible de diviser par 0!")
    }
    else{
      if(a==0){
        return 0
      }
      else{
        return a/b
      }
    }
  }
  
}

module.exports = {
  addition,
  quotient,
};
