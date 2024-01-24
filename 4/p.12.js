const get = (p) => (o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null, o))
const getUserComments = get(['a', 'b'])
const obj = {
    a: {
        b: [0],
    },
}
console.log(getUserComments(obj))

// const obj2 = {
//     a1: {
//         b1: {},
//     },
// }
// console.log(getUserComments(obj2))

// 以下 func 其實會回傳一個函式
const func = (a) => (b) => {
    console.log('a', a)
    console.log('b', b)
    return a
}
console.log(func('a'))
// 回傳函式如下
// (b) => {
//     console.log('a', a)
//     console.log('b', b)
//     return a
// }

// 呼喚回傳函式
func('a')('b')
