let myName = "Bun";

function sayHello(name: string): void {
    console.log(`Hello, ${name}`);
}

sayHello(myName);

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    sayHello(): void {
        console.log(`Hello, ${this.name}`);
    }
}

const person = new Person("Bun");

person.sayHello();