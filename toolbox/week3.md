# Week 3 (Higher Order Functions, Lambda Scope)

## Logging (cont)

    const longRunning = x => {
        out.textContent += " ...";
        setTimeout(_ => out.textContent += " " + x, 1000 * 2);
        retrun x;
    }

    // starting state
    const logAll = () => {
        console.error("error", longRunning("error"));
        console.warn("warn",   longRunning("warn"));
        console.info("info",   longRunning("info"));
        console.log("log",     longRunning("log"));
        console.debug("debug", longRunning("debug"));
    };

The long running function should only be called if it is actually logged (lazy).

    // constants
    const LEVEL_NONE  = -1;
    const LEVEL_ERROR = 0;
    const LEVEL_WARN  = 1;
    const LEVEL_INFO  = 2;
    const LEVEL_LOG   = 3;
    const LEVEL_DEBUG = 4;
    let logLevel = LEVEL_LOG;

    // strict version
    const error = getArgs => { if (logLevel >= LEVEL_ERROR) console.error(getArgs()); }
    const warn  = getArgs => { if (logLevel >= LEVEL_WARN)  console.warn (getArgs()); }
    const info  = getArgs => { if (logLevel >= LEVEL_INFO)  console.info (getArgs()); }
    const log   = getArgs => { if (logLevel >= LEVEL_LOG)   console.log  (getArgs()); }
    const debug = getArgs => { if (logLevel >= LEVEL_DEBUG) console.debug(getArgs()); }

    const logAll2 = () => {
        error( _ => ["error", longRunning("error")] );
        warn ( _ => ["warn",  longRunning("warn") ] );
        info ( _ => ["info",  longRunning("info") ] );
        log  ( _ => ["log",   longRunning("log")  ] );
        debug( _ => ["debug", longRunning("debug")] );
    };

## Bools (= Homework Week 1)

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

## Pair / Triple

    const Pair = x => y => f => f(x)(y);
    const firstname = konst;
    const lastname = snd;
    
    const dierk = Pair("Dierk")("König"); // immutable
    // dierk(firstname) === "Dierk"
    // dierk(lastname)  === "König"
    
    const Triple = x => y => z => f => f(x)(y)(z);
    const tfirstname = x => y => z => x;
    const tlastname = x => y => z => y;
    const tage = x => y => z => z;
    
    const tdierk = Triple("Dierk")("König")(50); // immutable
    // tdierk(tfirstname) === "Dierk"
    // tdierk(tlastname)  === "König"
    // tdierk(tage)       === 50

## Either / Maybe

    const Left = x => f => g => f(x);
    const Right = x => f => g => g(x);
    const either = f => err => succ => f(err)(succ);
    
    const safeDiv = num => divisor =>
    divisor === 0
        ? Left("schlecht!")
        : Right(num / divisor);
    
    either( safeDiv(1)(0) )
        ( x => console.error(x))
        ( x => console.log(x));
    // logs error: "schlecht!"
    (safeDiv(1)(0))(x => console.error(x))(x => console.log(x)) // also works

    const Nothing = Left();
    const Just = Right;
    const maybe = either;
    
    maybe(exprThatMightGoWrong)(handleBad)(handleGood)
