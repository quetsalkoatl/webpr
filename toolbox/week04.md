# Week 4 (Higher Order Functions)

## spread/rest

    function foo(args) { console.log(args) }
    foo("asd");
    foo("asd", "asdfj"); // only first arg is logged
    
    function bar(...args) { console.log(args) }
    bar("asd", "asdfj"); // the two args are passed as array
    function bar2(first, ...args) { console.log(first, args) }
    bar2("asd", "asdfj"); // first arg normal, second arg in an array (size 1)
    bar2("asd"); // first arg normal, second arg empty array (size 0)
    bar2(); // first arg undefined, second arg empty array (size 0)
    function bar3(first, ...args) { console.log(first); console.log(...args); }
    bar3("asd", "asdfj", "qwer"); // first arg normal, rest is spread in console.log([...])

## Map, Filter, Reduce
Multiple arguments vs. curried

    // multiple arguments
    const times = (a, b) => a * b;
    times(2); // error -> cannot multiply by undefined (when function is called)

    // curried
    const times = a => b => a * b;
    times(2); // error -> x is not a number, but a function (when result is used)

Mapping -> apply a function to all elements in array (for example)

    const times  = a => b => a * b;
    const double = times(2); // partial application

    [1,2,3].map(x => x * 2);
    [1,2,3].map(x => times(2)(x));
    [1,2,3].map(times(2)); // eta reduction
    [1,2,3].map(double);
    // all result in [2,4,8]

Map results in the same data structure with the same amount of elements! The type of the elements can be changed.
    
Filter -> filter elements in an array according to a function that returns a bool (true -> keep; false -> remove).

    const odd = x => x % 2 === 1;

    [1,2,3].filter(x => x % 2 === 1);
    [1,2,3].filter(x => odd(x));
    [1,2,3].filter(odd); // eta reduction
    // all result in [1,3]

Filter results in the same data structure, but with a smaller (or equal) amount of elements! The type of the elements cannot be changed.

Reduce -> reduce an array to a single value.

    [1,2,3,4].reduce((acc, cur) => acc + cur); // 10 (sum of elements)
    [1,2,3,4].reduce((acc, cur) => acc + 1);   // 4  (count elements)
    [1,2,3,4].reduce((acc, cur) => acc * 1);   // 24  (product of elements)
    // the start value is the first element of the array
    [1,2,3,4].reduce((acc, cur) => acc * 1, 1);   // start with an explicit value
    [1,2,3,4].reduce((acc, cur) => acc + 1, 0);   // start with an explicit value

    [].reduce((acc, cur) => acc + cur); // error
    [].reduce((acc, cur) => acc + cur, 0); // 0

    cont plus = (acc, cur) => acc + cur;
    [1,2,3].reduce((acc, cur) => acc + cur);
    [1,2,3].reduce(plus);
    [1,2,3].reduce(plus, 0);
    // all result in 6

Reduce results in a completely different data structure (could also be the same, if you want to).
You can do whatever you want with the input (including `map` and `filter`).

These Functors can be chained.

    [1,2,3].map(x => x%2 === 1).reduce((acc, cur) => acc && cur, true); // false
    [1,3,5].map(x => x%2 === 1).reduce((acc, cur) => acc && cur, true); // true

Other applications

    // map
    [1,2,3].reduce((acc, cur) => [...acc, cur*2], []); // same as map(x=>x*2)
    // filter
    [1,2,3].reduce((acc, cur) => cur % 2 === 1 ? [...acc, cur] : acc, []); // same as filter(x=>x%2===1)
    // reverse
    [1,2,3].reduce((acc, cur) => [cur, ...acc], []);