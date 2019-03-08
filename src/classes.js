class Person {
     constructor(name = 'Anonymous', age = 0) {
          this.name = name;
          this.age = age;
     }
     getDescription() {
          return `${this.name} is ${this.age} years old.` 
     }
}

class Student extends Person {
     constructor(name, age, major) {
          super(name,age);
          this.major = major;
     }
     hasMajor() {
          return !!this.major;
     }
     getDescription() {
          let description = super.getDescription();
          if (this.hasMajor() == true) {
               description += ` Their major is ${this.major}`;
          }
          return description;
     }
}

class Traveler extends Person {
     constructor(name, age, location) {
          super(name, age);
          this.location = location;
     }

     hasLocation() {
          return !!this.location;
     }
     
     getDescription() {
          let description = super.getDescription();
          if (this.location) {
               description += ` I am visiting from ${this.location}`;
          };
          return description;
     }
     
}

const travelerA = new Traveler('Ruan', 31, 'George');
console.log(travelerA.getDescription());

const travelerB = new Traveler('Frank', 35);
console.log(travelerB.getDescription());