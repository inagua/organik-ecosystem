# Organik | Ecosystem

> Ecosystem project of "The Nature Of Code" book.

This project is my developments for the *AMAZING* book [The Nature Of Code](https://natureofcode.com/) from Daniel SHIFFMAN: 
on each chapter, the book propose to increase the development of an "organic" ecosystem.

## Run

To run the project: 
```bash
npm start
npm run watch
```

To run the project **IN WATCH MODE**:
```bash
npm run watch
```

## Conventions

- Vanilla JavaScript variables (numbers / scalars, arrays, objects) are named without tailing underscores
  - eg, the initial velocity array can be named `velocity` and defined as `const velocity = [0, 2];` (it is an array)
- (Sylvester) Vectors are named with a tailing underscore
  - eg, the velocity vector can be named `velocity_` and defined as `const velocity_ = V$(velocity);` (it is a (Sylvester) vector)
- Vector's magnitude or modulus are named with a (second) tailing underscore
  - eg, the velocity vector's magnitude can be named `velocity__` and defined as `const velocity__ = velocity_.modulus();` (it is a scalar, a number)

## Chapters

- [Chapter 1 - The first animals of the ecosystem](https://github.com/inagua/organik-ecosystem/issues/2)
- [Chapter 2 - Forces](https://github.com/inagua/organik-ecosystem/issues/3)
