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

### [Adding or removing properties](https://codeburst.io/javascript-quickie-dot-notation-vs-bracket-notation-333641c0f781)

You can add a property to an object by using either 'dot notation'

```javascript
let obj = {
  cat: "meow",
  dog: "woof"
};
let sound = obj.cat;
console.log(sound);
// meow
```

or 'bracket notation'

```javascript
let obj = {
  cat: "meow",
  dog: "woof"
};
let sound = obj["cat"];
console.log(sound);
// meow
```

## Object Oriented Principles Expanded

### Abstraction

Variables declared within a function can be made private by using `let` or `const` in place of `this`. The scope of these local variables only exists within the function and cannot be accessed outside of the function.

### Inheritance

The second principle of OOP is inheritance, or taking on properties and methods from other modules. There are two types of inheritance: _classical_ and _prototypical_ inheritance.

#### Prototypes and prototypical inheritance

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

#### Instance vs prototype members

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

#### Tips

**Avoid modifying objects you don't own!**

**Premature optimization is the root of all evils!**
-Mosh
