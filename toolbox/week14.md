# Week 14 (Transpilers)

A transpiler "compiles" some programming language to Javascript. Well known examples are TypeScript or PureScript.

## TypeScript

- invented by Microsoft
- strongly typed layer on top of JS
- JS is also valid TS (TS is a superset of JS)
- TS is transpiled to regular JS
- typed state
- TS cannot enforce immutability (only with programmer discipline)
- object/component abstraction


- object-oriented with generics

[example](https://gist.github.com/Dierk/9c1df8c2766bc43add0bd7b3d0fd1a62)

## ELM

- Haskell-like syntax
- compiles to React
- designed for browser only
- typed state, immutable
- action type with values
- purely functional

[example](https://gist.github.com/Dierk/221e2991955578f196b5ae81ab0b9956#file-counter-elm-L42)

## PureScript

test on [playground](https://try.purescript.org)

- like ELM
- more Haskell-like
- browser and other JS environments
- purely functional

[example](https://gist.github.com/Dierk/c820c4a9dd6f60ecb4e78fe90709bd6c)

Another example

    module Main where
    
    import Prelude
    
    import Effect(Effect)
    import Effect.Console (logShow)
    import TryPureScript (render, withConsole)
    
    -- myid :: String -> String -- not working for 'myid 1' because of types (too restrictive)
    myid :: forall a. a -> a
    myid x = x
    
    -- myid1 :: forall a. a -> a -- not working because the + operation does not work for all types (too general)
    myid1 :: Int -> Int
    myid1 x = x + 1
    
    main :: Effect Unit
    main = render =<< withConsole do
    logShow (myid "hi webpr")
    logShow (myid 1)

