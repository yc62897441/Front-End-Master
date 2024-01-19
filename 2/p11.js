function foo1() {
    foo2()
}
function foo2() {
    foo3()
}
function foo3() {
    foo4()
}
function foo4() {
    console.lg('foo4') // 故意寫錯 lg
}
foo1()
