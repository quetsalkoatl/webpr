# Week 2 (Scopes, Lambda Calculus)

## Logging

    console.log("x is " + x);
    console.log("x", x, "bla", y);
    console.debug("something");
    console.error("something"); // additional info about where it was called
    console.warning("something");

    const obj = {x:1,y:true};
    console.log(obj); // output obj
    console.dir(obj); // output all properties
    const os = [{X:3,y:5}];
    console.table(os); // output as table

https://developer.mozilla.org/en-US/docs/Web/API/Console/log

## Scope

Global scope (**don't use it!**)

    x = 1;
    function foo() {
        x = 0;
        console.log(x);
    }
    foo();
    document.writeln(x === 1); // false

With `var` in a function it is explicitly set to `undefined` at the beginning (**don't use it!**)

    var x = 1;
    function foo() {
        // var x = unefined; // implicitly set
        console.log(x); // undefined
        var x = 0;
        console.log(x);
    }
    foo();
    document.writeln(x === 1); // true

With `let` (or `const`) the variable has to be declared before it is used (**good**)
    
    let x = 1; // could be const
    function foo() {
        console.log(x); // error!!
        let x = 0; // could be const
        console.log(x);
    }
    foo();
    document.writeln(x === 1); // true

Immediately invoked function expression (IIFE). Needs parenthesis!  
We use this if we need to isolate code.

    (function () {
        // do stuff in local scope
    })();

    (() => {
        // do stuff in local scope
    })();

    (_ => {
        // do stuff in local scope
    })();

    {
        // do stuff in local scope
    }

## Lambda Calculus

Alpha Translation

    const id = x => x; // pay attention to visibility!
    const id = y => y;

Beta Reduction

    (f => x =>  f(x))(id)(1)
    (     x => id(x))    (1)
    (          id(1))
    (    (x => x)(1))
                  1

Eta Reduction

    x => y => plus(x)(y)
    x =>      plus(x)
              plus

Examples

    const id    = x => x;
    const konst = x => y => x;
    const kite  = x => y => y;
    const kite2 = x => id;
    const kite3 = x => konst(id)(x);
    const kite4 = konst(id);

    document.writeln(id(id) === id);
    document.writeln(konst(id)(undefined) === id);
    document.writeln(konst(konst)(undefined) === konst);
    document.writeln(kite(undefined)(id) === id );
