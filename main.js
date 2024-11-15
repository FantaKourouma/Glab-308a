// Part: 1 Humble Beginnings
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
    },
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
};

// Test the roll method
console.log(adventurer.roll(1));
console.log(adventurer.roll(2));

// creating a loop to log each item in the robin's inventory
for (const x in adventurer) {
    console.log(adventurer[x]);
  }

  adventurer.roll();


// Part: 2 Class Fantasy

// this class is the template object
class Character {
    static MAX_HEALTH = 100;  // adding the static

    constructor(name) {
        this.name = name;
        this.health = 100;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
}

const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.companion.companion.roll();


// Part: 3
class Adventurer extends Character {
    static roles = ["Fighter", "Healer", "Wizard"]; // the static roles
    constructor (name, role) { // role is now extending the class Charactor properties 
      super(name);
      if (!Adventurer.roles.includes(role)) {
        throw new Error("Invalid role!");
      }
      // Adventurers have specialized roles.
      this.inventory.push("bedroll", "50 gold coins");
    }

    // creating a method deul() within the adventure extend class
    duel(opposing) {
        while (this.health > 50 && opposing.health > 50) {
          const myRoll = this.roll();
          const opponentRoll = opposing.roll();
          if (myRoll > opponentRoll) {
            opposing.health -= 1;
          } else {
            this.health -= 1;
          }
          console.log(`${this.name} (Health: ${this.health}) vs ${opposing.name} (Health: ${opposing.health})`);
        }
        const winner = this.health > 50 ? this.name : opposing.name;
        console.log(`${winner} wins the duel!`);
      }
    // Adventurers have the ability to scout ahead of them.
    scout () {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
    
  }

const adventurerRobin = new Adventurer("Robin", "Fighter");
const adventurerLeo = new Adventurer("Leo", "Healer");

const adventurerOne = new Adventurer("Robin", "Fighter");
const adventurerTwo = new Adventurer("Leo", "Healer");

// adventurerOne.duel(adventurerTwo);

// creating and extending a companion class 
class Companion extends Character {
    constructor(name, type, eatMeat, legs) {
        super(name);
        this.type = type;
        this.eatMeat = eatMeat = true;
        this.legs = legs;
    }

    walk(){
        return `${this.name} walks with ${legs}`
    }
}

const newRobin = new Companion("Birdy", "bird", "scarf and shoes", true, 2 );
console.log(newRobin);



// Part: 4 added the Static properties in part 2

// Part: 5
class AdventurerFactory {
    constructor(role) {
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer;
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find(a => a.name === name);
    }
}

const healerFactory = new AdventurerFactory("Healer");
const robinTwo = healerFactory.generate("Robin");


// Part: 6
class DuelAdventurer extends Adventurer {
    duel(opponent) {
        while (this.health > 0 && opponent.health > 0) {
            const myRoll = this.roll();
            const opponentRoll = opponent.roll();

            if (myRoll > opponentRoll) {
                opponent.health -= 10; // Reduce health by a fixed amount for clarity
                console.log(`${this.name} won this round! ${opponent.name} has ${opponent.health} health left.`);
            } else {
                this.health -= 10;
                console.log(`${opponent.name} won this round! ${this.name} has ${this.health} health left.`);
            }
        }

        if (this.health > 0) {
            console.log(`${this.name} wins the duel!`);
        } else {
            console.log(`${opponent.name} wins the duel!`);
        }
    }
}


// Part: 7
const fighter = new Adventurer("Aragorn", "Fighter");
const wizard = new Adventurer("Gandalf", "Wizard");

fighter.duel(wizard);


