# Week 15 (Crazy JS)

## Truthiness

The rule of transitivity is broken in JS.
Transitivity: `a == b == c => a == c`

    "0"  == 0    // true
    []   == 0    // true
    "\t" == 0    // true
    "0"  == []   // false
    []   == "\t" // false
    "\t" == "0"  // false

Every value in JS is also a boolean value. 6 of them are `false`:
 - `false`
 - `null`
 - `undefined`
 - `""`
 - `0`
 - `NaN`

## Coercion

    "1"   == 1     // true
    +"2"  == 2     // true
    !"0"  == false // true
    !!"0" == true  // true
    Number("0") == 0 // true

    const coerce = x => x ? true : false ;
    coerce("0")             // true
    coerce(+"0")            // false);
    coerce(Number("0"))     // false
    coerce(new Number("0")) // true

    coerce("any non empty string" == true) // false
    coerce("any non empty string")         // true

`==` does coerce, `===` does not! So ALWAYS use `===`  
One exception: `(a == null)` is better than `(a === null || a === undefined)`

## Coercion with numbers

    "2" + 1     === "21"
    "2" - 1     === 1
    "2" - - 1   === 3
    1 + 2 + "3" === "33"

    +true       === 1
    +false      === 0
    true + true === 2
    [] == []    === false // obj compared to obj
    [] == ![]   === true  // obj compared to bool
    +[]         === 0
    2 == [2]    === true  // the array is converted to "2" which is equal to 2
    [] + {}     === "[object Object]"
    {} + []     === 0 // {} is evaluated to nothing

## More weird stuff

    Number("-0")       === 0
    JSON.parse("-0")   === -0  // also 0
    JSON.stringify(-0) === "0"
    String(-0)         === "0"
    typeof null            === "object"
    null instanceof Object === false // because null is not an instance
    typeof NaN             === "number"

    typeof (1/0)         === "number"
    0.1 + 0.2 === 0.3    === false // rounding
    999_999_999_999_999_999 === 1_000_000_000_000_000_000
    Number.MAX_VALUE > 0 === true
    Number.MIN_VALUE < 0 === false

    Math.min(1, 2, 3) < Math.max(1, 2, 3) === true
    Math.min() < Math.max() === false // min() is the highest number, max() is the smallest

    1 < 2 < 3 === true  // 1 < 2 === true (1), 1 < 3 === true
    3 > 2 > 1 === false // 3 > 2 === true (1), 1 > 1 === false

    {} == {} === false
    {} >  {} === false
    {} >= {} === true  // JS converts all >= checks to !(a < b) -> {} < {} === false