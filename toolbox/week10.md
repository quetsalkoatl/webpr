# Week 10 (Async)

## Goodie

Regex (match, search, split, replace)

    "this is a string".match(/a/); // ["a"]
    "this is a string".search(/i/); // 2 (first postition of "i")
    "this is a string".search(/\bis\b/); // 5 (first postition of "is" surrounded by boundarys)
    "this is a string".split(/\bis\b/); // ["this ", " a string"]
    "this is a string".split(/\s/); // ["this", "is", "a", "string"]
    "this is a string".replace(/is/, "__"); // "th__ is a string"
    "this is a string".replace(/is/g, "__"); // "th__ __ a string"
    "this is a string".replace(/(\b\w+\b)/g, "$1-$1"); // "this-this is-is a-a string-string"
    
## Asynchronous programming

Callbacks and Events

    function start() {
        // ...
        window.onkeydown = evt => {
            // doSomething();
        }
        setInterval(() => {
            // doSomething();
        }, 1000/5);
    }

Callback hell

    function hell(win) {
        return () =>
            loadLink(win, REMOTE_SRC+'/assets/css/style.css', () =>
                loadLink(win, REMOTE_SRC+'/lib/async.js', () =>
                    loadLink(...)
                )
            );
    }

to flatten this we use promises (ex. fetch(...))

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
    async function doit() {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const todo = await resp.json();
            console.log(todo);
        } catch (err) {
            console.error(err);
        }
    }

    const processEven = i => new Promise( (resolve, reject) => {
        if (i % 2 === 0) {
            resolve(i);
        } else {
            reject(i);
        }
    });
    processEven(4) // success 4 is even
        .then ( it => {console.log(it); return it} )
        .then ( it => processEven(it+1)) // fails because 4+1 is not even -> catch is called
        .catch( err => console.log( "Error: " + err))

    const foo = async i => {
        const x = await processEven(i).catch( err => err);
        console.log("foo: " + x);
    };
    foo(4);