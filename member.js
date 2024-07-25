function skillsMember() {
    var member = {
        name: "John Doe",
        age: 30,
        skills: ["JavaScript", "Python", "Ruby"],
        greet: function() {
            return `Hello, my name is ${this.name} and I am ${this.age} years old!`;
        }
    };
    return member;
}