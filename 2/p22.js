const foo = (function () {
    var v = 0
    return () => {
        v++
        return v
    }
})()
for (let i = 0; i < 10; i++) {
    foo()
}
console.log(foo()) // 11

const foo2 = (function () {
    var v = 0
    return () => {
        return v++
    }
})()
for (let i = 0; i < 10; i++) {
    foo2()
}
console.log(foo2()) // 10
