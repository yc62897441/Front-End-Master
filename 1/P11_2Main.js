var a = 123
const foo = () => (a) => {
    console.log(this.a)
}

const obj1 = {
    a: 2,
}
const obj2 = {
    a: 3,
}

var bar = foo.call(obj1)
bar.call(obj2) // 123
