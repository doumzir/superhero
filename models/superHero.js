export class SuperHero {
  constructor(id, nom, pouvoir, age, email) {
    this.id = id;
    this.nom = nom;
    this.pouvoir = pouvoir;
    this.age = age;
    this.email = email;
  }

  toJSON() {
    return {
      id: this.id,
      nom: this.nom,
      pouvoir: this.pouvoir,
      age: this.age,
      email: this.email,
    };
  }
}
