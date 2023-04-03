const { getUser, getNumber50plus, libstockprod } = require("../shop");

const fakeUsers = require("../__mocks__/fakeUserValid.json");
const fakeProduct = require("../__mocks__/fakeProductValid.json");

describe("shop.js", () => {
  describe("getUser", () => {
    it("Doit retourner le bon user", () => {
      const res = getUser(1, fakeUsers);
      expect(res).toBe(fakeUsers[0]);
    });
    it("Doit renvoyer une erreur car l'utilisateur n'existe pas", () => {
      expect(() => {
        getUser(10, fakeUsers);
      }).toThrow("L'utilisateur 10 n'existe pas!");
    });
    it("Doit throw une erreur car l'identifiant passé en parametre est du mauvais type", () => {
      expect(() => {
        getUser("toto", 2);
      }).toThrow("L'identifiant doit être un entier positif");
    });
    it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
      expect(() => {
        getUser(1, "toto");
      }).toThrow(
        "La liste des utilisateur doit être un tableau contenant des utilisateurs"
      );
    });
    it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
      expect(() => {
        getUser(1, []);
      }).toThrow("La liste des utilisateur est vide");
    });
    it("Doit throw une erreur car l'id est invalide", () => {
      expect(() => {
        getUser(-1, fakeUsers);
      }).toThrow("L'identifiant doit être un entier positif");
    });
  });
  describe("getNumber50plus", () => {
    it("Doit donner une liste des numéros des utilisateurs de plus de 50 ans", () => {
      expect(() => {
        const res = getNumber50plus(fakeUsers);
        expect(res).toBe(fakeUsers[0].number);
      })
    });
    it("Doit retourner une liste vide car liste des utilisateur est vide", () => {
      expect(() => {
      const res = getNumber50plus([])
      }).toThrow("La liste des utilisateur est vide")
    });
    it("Doit retourner une erreur si la liste des utilisateurs n'en est pas une", () => {
      expect(() => {
        const res = getNumber50plus('toto')
      }).toThrow("La liste des utilisateur doit être un tableau contenant des utilisateurs")
    });
  });
  describe("libstockprod", () => {
    it("Retourne le libellé du produit et son stock appartenant à la catégorie donnée", () => {
      expect(() => {
        const res = libstockprod(fakeProduct,"smartphones");
        const resu = [("iPhone 9","Low")]
        expect(res).toBe(fakeUsers[0].number);
      })
    });
    it("Doit retourner une liste vide car liste des produits est vide", () => {
      expect(() => {
      const res = libstockprod([],"smartphones")
      }).toThrow("La liste des produits est vide")
    });
    it("Doit retourner une erreur si la liste des produits n'en est pas une", () => {
      expect(() => {
        const res = libstockprod('toto','smartphones')
      }).toThrow("La liste des produits doit être un tableau contenant des produits")
    });
    it("Doit retourner une erreur si la catégorie n'en est pas une", () => {
      expect(() => {
        const res = libstockprod(fakeProduct,fakeUsers)
      }).toThrow("Le type de la catégorie est erronné")
    });
  })
});