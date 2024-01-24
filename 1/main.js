function a() {
    'use strict'
    console.log('a', this) // undefined
}
a()

function b() {
    console.log('b', this) // window
}
b()

function C(name) {
    this.name = name
}
const c = new C('John')
console.log('c', c) // {name: 'John'}
a.bind(c)() // {name: 'John'}
b.bind(c)() // {name: 'John'}

const d = {
    d_fn: function () {
        console.log(this)
    },
}
d.d_fn() // {d_fn: ƒ}
