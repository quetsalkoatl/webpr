const id = x => x;
const konst = x => y => x;
const snd = x => y => y;
const flip = f => x => y => f(y)(x);

// const T = f => s => f;
// const F = f => s => s;
const T = konst;
const F = snd;

// const and = p => q => p(q(T)(F))(q(F)(F));
// const and = p => q => p(q      )(F      );
const and = p => q => p(q)(p);

// const or = p => q => p(q(T)(T))(q(T)(F));
// const or = p => q => p(T      )(q      );
const or = p => q => p(p)(q);

// const not = p => p(F)(T);
const not = flip;

// const beq = p => q => p(q(T)(F))(q(F)(T));
const beq = p => q => p(q)(not(q));

const Pair = x => y => f => f(x)(y);
const firstname = konst;
const lastname = snd;

const Triple = x => y => z => f => f(x)(y)(z);
const tfirstname = x => y => z => x;
const tlastname = x => y => z => y;
const tage = x => y => z => z;

const Left = x => f => g => f(x);
const Right = x => f => g => g(x);
// const either = f => err => succ => f(err)(succ);
const either = id;

const Nothing = Left();
const Just = Right;
const maybe = either;

// ----- special -----

const Tuple = n => [
    parmStore (n + 1) ( [] ) (parms => parms.reduce( (accu, it) => accu(it), parms.pop() ) ), // ctor
    ...Array.from( {length:n}, (it, idx) => iOfN (n) (idx) () )                    // selectors
];

const iOfN = n => i => value => // from n curried params, take argument at position i,
    n === 0
    ? value
    : x => iOfN (n-1) (i-1) ( i === 0 ? x : value );


const parmStore = n => args => onDone =>  // n args to come
    n === 0
    ? onDone(args)
    : arg => parmStore(n - 1)([...args, arg]) (onDone); // store parms in array

const Choice = n => [
    ...Array.from( {length:n}, (it, idx) => parmStore(n+1) ([]) (parms => parms[idx+1] (parms[0]) ) ), // ctors
    id
];




