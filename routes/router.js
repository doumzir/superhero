import express from "express";
import { SuperHero } from "../models/superHero.js";
const router = express.Router();

import * as allSuperHeros from "../data.json" assert { type: "json" };
console.log(allSuperHeros.default);
router.get("/", (req, res) => {
  res.json(allSuperHeros);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const hero = allSuperHeros.default.superHeros.find((hero) => hero.id === id);
  if (hero) {
    res.json(hero);
  } else {
    res.status(404).send("Super héros non trouvé");
  }
});

router.post("/", (req, res) => {
  const { nom, pouvoir, age, email } = req.body;

  if (!/^[a-zA-ZÀ-ÿ-]+$/.test(nom)) {
    return res
      .status(400)
      .send("Le nom ne doit contenir que des lettres et des tirets.");
  }

  if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(pouvoir)) {
    return res
      .status(400)
      .send(
        "Le pouvoir ne doit contenir que des lettres, des espaces et des tirets."
      );
  }

  if (!/^\d{2}$/.test(age)) {
    return res
      .status(400)
      .send("L'âge doit être un nombre entier de 2 chiffres.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,8}$/.test(email)) {
    return res.status(400).send("L'email n'est pas valide.");
  }

  const [localPart, domainPart, topLevelDomain] = email.split("@");
  if (!/^[a-z0-9_.-]+$/.test(localPart)) {
    return res
      .status(400)
      .send("La première partie de l'email n'est pas valide.");
  }
  if (!/^[a-z0-9_-]+$/.test(domainPart)) {
    return res
      .status(400)
      .send("La deuxième partie de l'email n'est pas valide.");
  }
  if (!/^[a-z]{2,8}$/.test(topLevelDomain)) {
    return res
      .status(400)
      .send("La troisième partie de l'email n'est pas valide.");
  }
  const newHeroData = req.body;
  const newHero = new SuperHero(
    newHeroData.id,
    newHeroData.nom,
    newHeroData.pouvoir,
    newHeroData.age,
    newHeroData.email
  );
  const existingHero = allSuperHeros.default.superHeros.find(
    (hero) => hero.id === newHero.id
  );
  if (existingHero) {
    res.status(409).send("Un super héros avec cet ID existe déjà");
  } else {
    allSuperHeros.default.superHeros.push(newHero.toJSON());
    res.status(201).send("Super héros créé avec succès");
  }
});

router.put("/:id", (req, res) => {
  const { nom, pouvoir, age, email } = req.body;

  if (!/^[a-zA-ZÀ-ÿ-]+$/.test(nom)) {
    return res
      .status(400)
      .send("Le nom ne doit contenir que des lettres et des tirets.");
  }

  if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(pouvoir)) {
    return res
      .status(400)
      .send(
        "Le pouvoir ne doit contenir que des lettres, des espaces et des tirets."
      );
  }

  if (!/^\d{2}$/.test(age)) {
    return res
      .status(400)
      .send("L'âge doit être un nombre entier de 2 chiffres.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,8}$/.test(email)) {
    return res.status(400).send("L'email n'est pas valide.");
  }

  const [localPart, domainPart, topLevelDomain] = email.split("@");
  if (!/^[a-z0-9_.-]+$/.test(localPart)) {
    return res
      .status(400)
      .send("La première partie de l'email n'est pas valide.");
  }
  if (!/^[a-z0-9_-]+$/.test(domainPart)) {
    return res
      .status(400)
      .send("La deuxième partie de l'email n'est pas valide.");
  }
  if (!/^[a-z]{2,8}$/.test(topLevelDomain)) {
    return res
      .status(400)
      .send("La troisième partie de l'email n'est pas valide.");
  }
  const id = parseInt(req.params.id);
  const updatedHeroData = req.body;
  const index = allSuperHeros.default.superHeros.findIndex(
    (hero) => hero.id === id
  );
  if (index !== -1) {
    const updatedHero = new SuperHero(
      updatedHeroData.id,
      updatedHeroData.nom,
      updatedHeroData.pouvoir,
      updatedHeroData.age,
      updatedHeroData.email
    );
    allSuperHeros[index] = updatedHero.toJSON();
    res.send("Super héros mis à jour avec succès");
  } else {
    res.status(404).send("Super héros non trouvé");
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = allSuperHeros.default.superHeros.findIndex(
    (hero) => hero.id === id
  );
  if (index !== -1) {
    allSuperHeros.default.superHeros.splice(index, 1);
    res.send("Super héros supprimé avec succès");
  } else {
    res.status(404).send("Super héros non trouvé");
  }
});

export default router;
