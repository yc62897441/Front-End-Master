foo(10)
function foo(num) {
    console.log(foo) // undefined
    foo = num
    console.log(foo) // 10
    var foo
}
console.log(foo) // ƒ foo(num) {...}
foo = 1
console.log(foo) // 1
