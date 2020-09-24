/* 

Write an Object constructor for people that includes properties for firstName, lastName, 
gender, and age. Using the inheritance chain, write out two prototype methods: one that 
prints out “My name is [firstName] [lastName] and I am a(n) [age]-year old [gender].” and 
one that prints out whether or not they're eligible for a senior citizen discount (over 
    the age of 65).

*/
//Written in ES6
class Person {
  // person constructor here
  constructor(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
  }

  // introduction function here
  introduce() {
    console.log(
      `My name is ${this.firstName} ${this.lastName} and I am a ${this.age}-year old ${this.gender}.`
    );
  }

  // discount eligible function here
  seniorDiscount() {
    const eligibleStr =
      this.age > 65
        ? `${this.firstName} ${this.lastName} is eligible for senior citizen discount.`
        : `${this.firstName} ${this.lastName} is not eligible for senior citizen discount.`;

        console.log(eligibleStr);
  }
}

const persons = [
  new Person("Scott", "Brown", "Male", 56),
  new Person("Sara", "Miller", "Female", 67),
  new Person("David", "Borde", "Male", 71),
];

persons.forEach((p) => {
  p.introduce();
  p.seniorDiscount();
});
