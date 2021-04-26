# Week 9 (MVC)

## Goodie

    let arr = [1, 2, 3, 4];
    [42, arr]        // [42, [1, 2, 3, 4]]
    [42, ...arr]     // [42, 1, 2, 3, 4]
    let x = [...arr] // [1, 2, 3, 4] (duplication)
    x === arr        // false (ist a different array)
    
    let obj = {a:1, b:2};
    {c:3, ...obj}    // {c:3, a:1, b:2}
    {...obj}         // {a:1, b:2} (duplication)
    {a:42, ...obj}   // {a:1, b:2}
    {...obj, a:42}   // {b:2, a:42}

## Protocols

Protocols are sets of instructions one has to do every time for certain actions:
- Read file (open, read, do things, close)
- DB connection (connect, prepare statement, insert variables, execute)
- Error handling
- ...

Protocols can usually be extracted or abstracted in methods to avoid duplicated code

## UI "Framework"

(see week9/Milestone 0-4)

Milestone 0 is working and okay for such a small application. But layout, UI handling and logic are tightly coupled together.

Milestone 1 (Reorganisation). We want to improve clarity and reduce coupling by splitting responsibilities.