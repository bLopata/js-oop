function Circle(radius) {
  this.move = function () {
    this.draw()
    console.log('move')
  }
  // Instance members
  this.radius = radius

}

// Prototype members
Circle.prototype.draw = function () {
  console.log('draw')
}

const c1 = new Circle(1)
const c2 = new Circle(1)

Circle.prototype.toString = function () {
  return `Circle with radius ${this.radius}`
}

Object.keys(c1)