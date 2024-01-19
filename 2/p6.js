function foo(arg1) {
    let arg1
}
foo('arg1') // Identifier 'arg1' has already been declared

function foo2(arg1) {
    let arg1 = arg1 || 'default'
}
foo2('arg1') // Identifier 'arg1' has already been declared

function foo3(arg1) {
    arg1 = arg1 || 'default'
    console.log(arg1)
}
foo3('arg1') // arg1
foo3() // default
foo3(undefined) // default
