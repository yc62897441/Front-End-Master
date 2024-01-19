function foo() {
    let value = Math.random()

    function bar() {
        console.log(value)
        debugger
    }

    return bar
}
let bar = foo()
bar()
