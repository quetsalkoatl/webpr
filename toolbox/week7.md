# Week 7 (Classes)

## Strings

    const a = "<p class=\"a b\" href=\" \\ \">";
    const b = '<p class="a b" href=" \\ ">';
    const three = String(3); // "3"
    // regular expressions -> example: .\w1
    ".\\w1"
    /.\w1/
    // backticks (multi-lines and variables)
    `sdf
    asdff ${x}`

## repetition objects

    // open, dynamic
    const good = {
        firstname: "Good",
        lastname :  "Boy",
        getName  : function() {
            return this.firstname + " " + this.lastname;
        }
    }

    // closed, explicit
    function Person(first, last) {
        let firstname = first;
        let lastname  = last;
        return {
            getName: function() {
                return firstname + " " + lastname;
            }
        }
    }
    
    // mixed, classified
    const Person = ( () => {
        function Person(first, last) {
            this.firstname = first;
            this.lastname  = last;
        }
        Person.prototype.getName = function() {
            return this.firstname + " " + this.lastname;
        }
        return Person;
    });
    // new Person("Good", "Boy") instanceof Person

## Classes

The "class"-Keyword is only used in the 3rd (mixed, classified) type of objects

    class Person {
        constructor(first, last) {
            this.firstname = first;
            this.lastname  = last;
        }
        getName() {
            return this.firstname + " " + this.lastname;
        }
    }
    // new Person("Good", "Boy") instanceof Person

the "extends"-Keyword is used to create a prototype chain

    class Student extends Person {
        constructor(first, last, grade) {
            super(first, last); //IMPORTANT
            this.grade = grade;
        }
    }
    const s = new Student("Top", "Student", 5.5);

Functions are objects and have a prototype property (which is an object). It references and object with a name ("Type"), constructor (Type-Function) and a prototype itself.  
Objects are **NOT** Functions (in js-code), but they are in a theoretical programming sense.

    const s = new Student();
    // s.__proto__              === Student.prototype;
    // Object.getPrototypeOf(s) === Student.prototype;
    // s instanceof Student // this works for inheritance as well

In js a class can change its prototype during runtime -> change the "type" an object `Object.setPrototypeOf(obj, proto)`

To dynamically call functions a function call tries to find the function on the prototype (and the proto of the proto) until it reaches Object.prototype
