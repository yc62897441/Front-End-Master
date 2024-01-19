function foo() {
    console.log(bar) // Cannot access 'bar' before initialization
    let bar = 3
}
foo()
