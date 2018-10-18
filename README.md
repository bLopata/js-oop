# Object Oriented Programming in JS

## Four components

### _Abstraction_

Abstraction aims to reduce code complexity and increase readibility by exposing only the essential features of an entity while hiding other details.

### _Encapsulation_

Encapsulation is hiding modules and other internal data from other modules.

### _Inheritance_

Inheritance is the practice of passing properties and methods from one class to it's sub-classes.

### _Polymorphism_

Polymorphism is the ability of an object to change behavior on runtime.

## Factory functions vs Constructor functions

These two methods are similar in nature, but

```javascript
// Factory function
function createCircle(radius) {
  return {
    radius,
    draw: function() {
      console.log("draw");
    }
  };
}

const circle = createCircle(1);
```

```javascript
// Constructor function
function Circle(radius) {
  console.log("this", this);
  this.radius = radius;
  this.draw = function() {
    console.log("draw");
  };
}

const another = new Circle(1);
```

Constructor functions use the `this` keyword within the function definition, and the `new` keyword to instantiate the function, similar to a class in other OOP languages.

## Literals

Instantiating an object using

`let x = {};`

is an Object Literal.

The JavaScript engine compiles this literal definition as

`x = new Object();`

Similarly, you can instantiate a String, Boolean, or Number value using the constructor or the literal counterpart.

## Primitives and Objects

In JavaScript, you have two types of data:

### Value types

- Number
- String
- Boolean
- Symbol
- undefined
- null

### Reference types

- Functions (which are objects)
- Objects
- Arrays (which are also objects)

Simply put, you have value types and objects.

Primitives are copied by their value while reference Types are copied by the reference.

```javascript
let x = {
  value: 10
};
let y = x;

x.value = 20;
```

Both `x` and `y` point to the same object in memory.

### Adding or removing properties

You can use either 'dot notation' or 'bracket notation' to add a property to an object.

## Object Oriented Principles Expanded

### Abstraction

Variables declared within a function can be made private by using `let` or `const` in place of `this`. The scope of these local variables only exists within the function and cannot be accessed outside of the function.

### Inheritance

The second principle of OOP is inheritance, or taking on properties and methods from other modules. There are two types of inheritance: _classical_ and _prototypical_ inheritance.

#### Prototypes and prototypical inheriance
