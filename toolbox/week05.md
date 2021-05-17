# Week 5 (Scripting)

## Automated Semicolon Insertion

    // everytiong fine:
    console.log(1); // shift+enter
    [1,2,3].forEach(x=>console.log(x));

    // everytiong fine:
    console.log(1) // enter
    [1,2,3].forEach(x=>console.log(x));

    // TypeError: undefined is not an object
    console.log(1) // shift+enter
    [1,2,3].forEach(x=>console.log(x));
    // equals -> console.log(1)[1,2,3].forEach(...)

## Retrospective

Week 3

    const Left = x => f => g => f(x);
    const Right = x => f => g => g(x);
    const either = f => err => succ => f(err)(succ);
    // special case
    const Nothing = Left();
    const Just = Right;
    const maybe = either;

Week 4

    const times = a => b => a * b; // monoid
    const double = times(2); // partial application
    [1,2,3].map(times(2)); // functor

## Lambda

    const id    = x => x;
    const konst = x => y => x;

    // id(id) === id
    const M = f => f(f);
    // M(M)
    // (f => f(f)) (f => f(f))
    // (f => f(f)) (g => g(g))
    //((g => g(g))((g => g(g)))) // beta-translation
    // (f => f(f)) (f => f(f)) // eta-reduction + rename g->f

## Scripting

What is scripting?  
1. When we evaluate text
2. Text comes from: file, URL, DB, User Input, ...
3. Text can be modified, amended, etc.

For example: Command Line, Automation, Build System, Templating, Code Distribution, Business Rules, Smart Configuration,
DSL, Self-Modifying Code

Usually interpreted (not compiled), lenient type system, "best effort" approach

    "foo " + 1 // = "foo 1"
    1 + 1      // = 2

You can load scripts inside a script:

    <script>
        const testNames = [
            "function",
            "lambda",
            "snake"
        ];
        testNames.forEach( name => {
            document.writeln(`<script src="${name}/${name}.js"/></` + 'script>');
            document.writeln(`<script src="${name}/${name}Test.js"/></` + 'script>');
        });
    </script>

Evaluating a string as code:

    eval(...);

    const code = "1";
    eval(code + "+1"); // = 2
    let x = 0;
    eval("x = " + code + "+1"); // x = 2

`eval(...)` works as if the evaluated code was in place of the eval() function.

`Function()` function:

    const add = Function('x', 'y', 'return x+y'); // constructor
    add(1, 2); // = 3
    add(2, 3); // = 5 ; no need to re-parse (unlike eval())
