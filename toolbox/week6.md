# Week 6 (objects)

## Array.from(...)

    Array.from("foo"); // -> ["f", "o", "o"]
    Array.from({length: 5}); // -> [undefined, undefined, undefined, undefined, undefined]
    Array.from({length: 5}).map( (x, idx) => idx); // -> [0, 1, 2, 3, 4]
    Array.from({length: 5}, (x, idx) => idx); // -> [0, 1, 2, 3, 4]

## Window

If you have a DOM element with the attribute "id" set, it can directly be referred to.

    <button id="someButton">click it</button>
    document.getElementById("someButton") === window.someButton === this.someButton === someButton // in global scope

## Objects

What are objects: Data structures, Methods for access management, (a location for mutable state, abstraction and polymorphism)

- open, dynamic
- closed, explicit
- mixed, classified

JS "Objects" (open, dynamic). Should not be exposed to other users (only internal)

    // no safety but dynamic
    // keys and values can change at any time
    // "this" is dangerous to use
    // how to share structure and functions?
    const good = {
        firstname: "Good",
        lastname : "Boy",
        getName  : function() { // would not work with arrow function ("this" only available with "function" keyword)
            return this.firstname + " " + this.lastname;
        }
    };

closure scope (closed, explicit). No "this"

    // easy to share structure
    // no classes (you cannot check if a variable is of type "Person")
    function Person(first, last) {
        let firstname = first;
        let lastname = last;
        return {
            getName: function() { // can also be an arrow function
                return firstname + " " + lastname;
            }
        }
    }
    Person("Good", "Boy");

    const Person = (first, last) => {
        ...
    }

class-like (mixed, classified). Depends on "new"

    const Person = ( () => {
        function Person(first, last) {
            this.firstname = first;
            this.lastname = last;
        };
        Person.prototype.getName = function() { // could not be an arrow function because usage of "this"
            return this.firstname + " " + this.lastname;
        };
        return Person;
    }) (); // IIFE (immediately invoked function expression)
    new Person("Good", "Boy") instanceof Person; // true

Not all objects are functions but all functions are objects!

## Prototype

It classifies objects similar to "type", it is itself an object, manages shared structure