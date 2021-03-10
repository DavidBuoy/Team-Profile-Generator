//todo Create a class that i can use to extend my other classes and then export
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.title = title;

    }
    // here we create methods 
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.title;
    }
}

module.exports = Employee