
// requires util.js

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

// extending the prototype of many objects
test("util-times", assert => {
    const collect = [];

    (10).times( n => collect.push(n) );

    assert.is(collect.length, 10);
    assert.is(collect[0], 0);
    assert.is(collect[9], 9);
});

( () => {
    let ok = [];



    const collect = (10).times( n => n+1 );

    ok.push(collect.length === 10);
    ok.push(collect[0] === 1);
    ok.push(collect[9] === 10);

    report("util-times", ok);
}) ();
