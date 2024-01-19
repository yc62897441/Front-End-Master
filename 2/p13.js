function numGenerator() {
    let num = 1
    num++
    return () => {
        console.log(num)
    }
}
var getNum = numGenerator()
getNum()

function numGenerator2() {
    let num = 1
    num++
    return () => {
        return num
    }
}
var getNum2 = numGenerator2()
console.log(getNum2()) // 2
console.log(getNum2()) // 2
