# Week 11 (Data Flow)

## Goodie (Bools)

    let a;
    "webpr" && true // true
    true && "webpr" // "webpr"
    // returns last evaluated value
    a = false;
    a && a.startsWith && a.startsWith("web") // false
    a = "webpr";
    a && a.startsWith && a.startsWith("web") // true
    a && a.indexOf && a.indexOf("pr") // 3
    a = {x:1};
    a && a.indexOf && a.indexOf("pr") // undefined

    "webpr" || true // "webpr"
    false || "xxx" // "xxx"
    false || "" // "" (falsy)
    // returns last evaluated value
    a = {x:1};
    a && a.indexOf && a || 42 // 42

    a = "";
    a && a.toString() // ""
    a = 0;
    a && a.toString() // 0

    // falsy : false, 0, "", NaN, null, undefined
    // [] and {} are truthy!!

## Scheduler

Sometimes you want a series of tasks executed one after the other. This is where a Scheduler comes into play.

    const Scheduler = () => {
        let inProcess = false;
        const tasks = [];
        function process() {
            if (inProcess) { return; }
            if (tasks.length === 0) { return; } // guard clause
            inProcess = true;
            const task = tasks.pop();
    
            new Promise( (resolve, reject) => {
                task(resolve);
            }). then ( () => {
                inProcess = false;
                process();
            });
        }
        function add(task) {
            tasks.unshift(task);
            process();
        }
        return {
            add: add,
            addOk: task => add( ok => { task(); ok(); }) // convenience
        }
    };

    const result = [];

    const scheduler = Scheduler();
    scheduler.add(ok => {
        setTimeout(_ => {   // we wait before pushing
            result.push(1);
            ok();
        }, 100)
    });
    scheduler.add(ok => {   // we push "immediately"
        result.push(2);
        ok();
    });
    scheduler.addOk ( () => result.push(3)); // convenience

Even though we have a timeout in the first task the result is always [1, 2, 3].  
Since there is only one thread (thread confinement), there can never be an interruption in the "wrong" moment.

## Result Dependency

If an action needs the result of another action, we need a guarantee that the first action is executed exactly once before the other.

    const DataFlowVariable = howto => {
        let value = undefined; // cache
        return () => undefined === value
                     ? value = howto()
                     : value;
    };

    const z = DataFlowVariable(() => x() + y());   // z depends on x and y, which are set later...
    const x = DataFlowVariable(() => y());         // x depends on y, which is set later...
    const y = DataFlowVariable(() => 1);
    z() // 2
    x() // 1
    y() // 1

    let counter = 0;
    const x = DataFlowVariable(() => {
        counter++;
        return 1;
    });
    // counter === 0
    x() // 1
    // counter === 1
    x() // 1
    // counter === 1 (because the result of the DataFlowVariable is cached)
