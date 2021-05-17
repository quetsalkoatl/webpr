# Week 8 (Programming)

## Goodie

    const x = 1; const y = 2;
    {x: x, y: y} === {x, y}
    
    const foo  = arg     => console.log(arg.x);
    foo({x});
    cosnt foo2 = ( {x} ) => console.log(x);
    foo1({x});
    cosnt foo3 = ( {x, y=42} ) => console.log(x, y);
    foo3({x});   // 1 - 42
    foo3({x,y}); // 1 - 2

## move repeated code into a function

from

    ( () => {
        let ok = [];
        
        const collect = [];
        (10).times( n => collect.push(n) );
    
        ok.push(collect.length === 10);
        ok.push(collect[0] === 0);
        ok.push(collect[9] === 9);

        report("util-times", ok);
    }) ();

    ( () => {
        let ok = [];
    
        const collect = (10).times( n => n+1 );
    
        ok.push(collect.length === 10);
        ok.push(collect[0] === 1);
        ok.push(collect[9] === 10);
    
        report("util-times", ok);
    }) ();

    // some code is duplicated

to

    const test = (name, callback) => {
        let ok = [];
        const assert = {
            is: (a, b) => {
                ok.push(a === b);
                if (a !== b) {
                    console.error("was not equal:", {a,b});
                }
            }
        };
        callback(assert);
        report(name, ok);
    }
    
    test("util-times", assert => {
        const collect = [];
        (10).times( n => collect.push(n) );
    
        assert.is(collect.length, 10);
        assert.is(collect[0], 0);
        assert.is(collect[9], 9);
    });
    
    test("util-times", assert => {
        const collect = (10).times( n => n+1 );
    
        assert.is(collect.length, 10);
        assert.is(collect[0], 1);
        assert.is(collect[9], 10);
    });

## moves

0. Explore (be prepared)
1. Start at the end (fake it until you make it)
2. Extract (statics to variables, extract duplicates to methods)
3. Abstract (concepts behind extraction)
4. Reorganize (make your future work easier, organize)
5. Release (the solution should stand on its own. Tests, documentation, examples)
6. Retrospective (what to keep, what to try differently next time)