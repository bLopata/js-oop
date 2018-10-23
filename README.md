# Object Oriented Programming in JS

# Table of contents

1. [Principles of Object Oriented Programming](#Principles)

   - [Abstraction](#Abstraction)
   - [Encapsulation](#Encapsulation)
   - [Inheritance](#Inheritance)
   - [Polymorphism](#Polymorphism)

2. [Definitions](#Definitions)

   - [Factory and Constructor Functions](#FnTypes)
   - [Literals](#Literals)
   - [Data types](#DataTypes)
   - [Property modification](#Modifying)

3. [Expanded Principles](#Expanded)

   - [Abstraction](#ExpandedExpandedAbstraction)
   - [Inheritance](#ExpandedInheritance)
     - [Prototypes and Prototypical Inheritance](#Prototypical)
     - [Instance vs Prototype Members](#InstancevsPrototype)
     - [Creating your own prototype](#CustomPrototype)
     - [Super constructor](#SuperConstructor)
     - [Method overwriting](#MethodOverwriting)
   - [Polymorphism](#ExpandedPolymorphism)
     - [Composition](#Composition)

4. [Classes](#Classes)

   - [Static methods](#StaticMethods)
   - [This keyword](#This)
   - [Class inheritance](#ClassInheritance)

5. [Tips](#Tips)

# Principles of Object Oriented Programming <a name="Principles"></a>

## Abstraction<a name="Abstraction"></a>

Abstraction aims to reduce code complexity and increase readibility by exposing only the essential features of an entity while hiding other details.

## Encapsulation<a name="Encapsulation"></a>

Encapsulation is hiding modules and other internal data from other modules.

## Inheritance<a name="Inheritance"></a>

Inheritance is the practice of passing properties and methods from one class to it's sub-classes.

## Polymorphism<a name="Polymorphism"></a>

Polymorphism is the ability of an object to change behavior on runtime.

# Definitions<a name="Definitions"></a>

## Factory functions vs Constructor functions<a name="FnTypes"></a>

Consider the following two methods:

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

While they are similar, the constructor functions use the `this` keyword within the function definition, and the `new` keyword to instantiate the function, similar to a class in other OOP languages, whereas the factory function returns an object containing the same information.

## Literals<a name="Literals"></a>

Instantiating an object using

`let x = {};`

is an Object Literal.

The JavaScript engine compiles this literal definition as

`x = new Object();`

Similarly, you can instantiate a String, Boolean, or Number value using the constructor or the literal counterpart.

## Primitives and Objects<a name="DataTypes"></a>

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

Simply put, you have **value types** and **objects**.

Primitives are copied by their value while reference Types are copied by the reference.

```javascript
let x = {
  value: 10
};
let y = x;

x.value = 20;
```

Both `x` and `y` point to the same object in memory.

### [Adding or removing properties](https://codeburst.io/javascript-quickie-dot-notation-vs-bracket-notation-333641c0f781)<a name="Modifying"></a>

You can add a property to an object by using either '_dot notation_'

```javascript
let obj = {
  cat: "meow",
  dog: "woof"
};
let sound = obj.cat;
console.log(sound);
// meow
```

or '_bracket notation_'

```javascript
let obj = {
  cat: "meow",
  dog: "woof"
};
let sound = obj["cat"];
console.log(sound);
// meow
```

## Object Oriented Principles Expanded<a name="Expanded"></a>

## Abstraction<a name="ExpandedAbstraction"></a>

Variables declared within a function can be made private by using `let` or `const` in place of `this`. The scope of these local variables only exists within the function and cannot be accessed outside of the function.

Abstraction can be acheived by using `private` properties and methods in JavaScript Objects or Classes. In ES6 there is a new primitive type called Symbol which can be used to anonymize and privatize properties and methods.

```js
const _radius = Symbol();
class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }
}

const c = new Circle();
```

_WeakMaps_, a new type in ES6, can also be used to implement private properties and methods. A WeakMap is essentially a dictionary where the keys are Objects and the values can be anything. The keys will be garbage collected if not referenced.

```js
const _radius = new WeakMap();

class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }
}
```

_Getters and setters_ can allow access to properties without needing a method call. They are defined within a Class declaration by using

```js
  get radius() {
    return _radius.get(this)
  }
```

and

```js
  set radius(value) {
    if (value <= 0) throw new Error('invalid radius')
    _radius.set(this, value)
  }
```

## Inheritance<a name="ExpandedInheritance"></a>

The second principle of OOP is inheritance, or taking on properties and methods from other modules. There are two types of inheritance: _classical_ and _prototypical_ inheritance.

## Prototypes and prototypical inheritance<a name="Prototypical"></a>

The prototype is the parent object, which allows child objects to inherit attributes from the prototype. Every object in JavaScript has a prototype except the root object, the objectBase.

You can access the prototype object by using

```javascript
let exampleObject = {};

Object.getPrototypeOf(exampleObject);
```

You can modify attributes, or extend the scope of a property to the prototype of an object by using

```javascript
Object.defineProperty(exampleObject, "exampleProperty", {
  configurable: false, // cannot be deleted
  writable: false,
  enumerable: false
});
```

And access the attributes of a property by using

```javascript
Object.getOwnPropertyDescriptor(exampleObject, "exampleAttribute");
```

The parent of an object is also the prototype of it's constructor.

```javascript
let obj = {};

obj.__proto__;
```

is the same as

```javascript
Object.prototype;
```

I.e.

```javascript
Object.prototype === Object.getPrototypeOf({});
Array.prototype === Object.getPrototypeOf([]);
```

All objects created with the same constructor will have the same prototype.
A single instance of this prototype will be stored in the memory.

```javascript
const x = {};
const y = {};
Object.getPrototypeOf(x) === Object.getPrototypeOf(y); // returns true
```

To get the own/instance properties, use

```js
Object.keys(obj);
```

And to get all the properties (own + prototype) , use

```js
for (let key in obj) {
}
```

### Instance vs prototype members<a name="InstancevsPrototype"></a>

```javascript
function Circle(radius) {
  // Instance members
  this.radius = radius;
}

// Prototype members
Circle.prototype.draw = function() {
  console.log("draw");
};
```

When calling a method of an object, the JavaScript engine first looks at the Instance members, before looking at the prototype members. In the above example, the `Circle.draw()` method call would use the function declared in the prototype object, rather than the instance of the `Circle` object.

### Creating your own prototype<a name="CustomPrototype"></a>

When multiple child objects are required which must inherit attributes from a user-defined Object, you can create a custom prototype to handle this inheritance.

For example, the Shape object is created below, and the prototype for the Child `Circle` object is set as the Shape.prototype. **NOTE** when setting the prototype in this fashion, you must also set the `Circle.prototype.constructor` to the `Circle` constructor function to avoid issues when instantiating a `new` Object.

```js
function Shape() {}

Shape.prototype.duplicate = function() {
  console.log("duplicate");
};

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() {
  console.log("draw");
};

const s = new Shape();
const c = new Circle(1);
```

Additionally, this logic for setting the custom prototype and resetting the constructor can be encapsulated into a function, i.e.

```js
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
```

### Calling the super constructor<a name="SuperConstructor"></a>

To substitute a property in the child object with one declared in the parent object, use the `call()` method, i.e.

```js
parentObject.call(this, exampleProperty);
```

within the declaration of the child object.

### Method overwriting<a name="MethodOverwriting"></a>

Method overwriting is used when one or more child objects requires a different implementation of a parent object property. You simply re-declare a property on the Child object. As described earlier, the JavaScript engine walks up the chain from the child object to the parent object on a method call, therefore the function declaration on the Child object will be used, i.e.

```js
Circle.prototype.duplicate = function() {
  Shape.prototype.duplicate.call(this);
  console.log("duplicate circle");
};
```

## Polymorphism<a name="ExpandedPolymorphism"></a>

If we expand the above example for method overwriting with a second constructor, `Square`, with yet another `duplicate()` method implementation, we are broaching into Polymorphism, the fourth pillar of OOP.

Now with the heirarchy of a parent object, and two derivative--or child objects, we can iterate over an array of objects, i.e.

```js
const shapes = [new Circle(), new Square()];
```

with a for loop

```js
for (let shape of shapes) shape.duplicate();
```

which uses the `duplicate()` method unique to each object.

### Composition<a name="Composition"></a>

To avoid complex inheritance heirarchies, use composition instead of inheritance. Composition involves creating objects, and then using the `Object.assign()` method to combine the source objects. This can further be encapsulated using an interable array as an input argument to a function, i.e.

```js
function mixIn(target, ...sources) {
  Object.assign(target, ...sources);
}
```

(_See mixins.js for more information, including `spread` operator_.)

## Classes in ES6<a name="Classes"></a>

Classes are a new feature in JavaScript ES6. They are essentially sytactic sugar over prototypical inheritance.

```js
class Circle {
  constructor(radius) {
    this.radius = radius;

    // Methods declared here are instantiated on the child object.
    this.move = function() {};
  }
  // All methods declared here are added on the prototype.
  draw() {
    console.log("draw");
  }
}

const c = new Circle(1);
```

Classes, like functions, can be invoked using declaration or expression. And, like functions, the class declaration will be hoisted to the top of the file while class expressions will not.

### Static Methods<a name="StaticMethods"></a>

Static methods can be declared within a class by using the `static` prefix keyword. Static methods are utility functions which can be used outside of the scope of the class to acheive some return value, i.e.

```js
class Math2 {
  static abs(value) {
    // ...
  }
}

Math2.abs();
```

### This keyword<a name="This"></a>

Consider the following:

```js
const Circle = function() {
  this.draw = function() {
    console.log(this);
  };
};
const c = new Circle();

// Method call on an object
c.draw();

const draw = c.draw;

// Function call
draw();
```

The output of the method call will be the Circle object, whereas the output of the function call will be the global object - Window in the browser and Global in node. However, the strict mode can be used to prevent function calls from accessing the global object by adding `'use strict'` to the top of the file. This is to prevent the user from modifying the global object. By default, the body of a class declaration will use the strict mode.

### Class inheritance<a name="ClassInheritance"></a>

Inheriting methods from a prototype class is very simple using classes. Simply use the `extends` keyword in the class declaration, i.e.

```js
class Shape {
  move() {
    console.log("move");
  }
}

class Circle extends Shape {
  draw() {
    console.log("draw");
  }
}
```

Property inheritance requires constructors in the child class to invoke the `super()` method which indicates that the property is defined in the parent Object. If we add a constructor for color to the parent Class in the above example, i.e.

```js
// Parent Object
  constructor(color) {
    this.color = color
  }
```

a constructor must then be added which invokes `super()` to inherit the property from the parent Class, so

```js
// Child Object
  constructor(color) {
    super(color)
  }
```

## Tips<a name="Tips"></a>

Function declarations are hoisted by the engine to the top of the file. Function expressions are not hoisted. You will not get an error at runtime when calling a function before it's declaration, however you will get an error for calling a function before it's expression.

```js
// Function declaration
function sayHello() {}

// Function expression
const sayGoodbye = function() {};
```

Avoid creating inheritance heirarchies of more than one level of inheritance. Instead, using composition of objects.

**Avoid modifying objects you don't own!**

**Premature optimization is the root of all evils!**
-Mosh
