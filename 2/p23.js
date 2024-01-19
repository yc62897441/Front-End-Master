const foo = () => {
    var arr = []
    var i
    for (i = 0; i < 10; i++) {
        arr[i] = function () {
            console.log(i)
        }
    }
    return arr[0]
}
foo()() // 10

const foo2 = () => {
    var arr = []
    for (let i = 0; i < 10; i++) {
        arr[i] = function () {
            console.log(i)
        }
    }
    return arr[0]
}
foo2()() // 0
