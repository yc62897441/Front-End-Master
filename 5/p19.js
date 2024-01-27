console.log('start here')

const f00 = () =>
    new Promise((resolve, reject) => {
        console.log('first promise constructor')

        let promise1 = new Promise((resolve, reject) => {
            console.log('second promise constructor')

            setTimeout(() => {
                console.log('setTimeout here')
                resolve()
            }, 0) // 第 1 個進入任務佇列

            resolve('promise 1')
        })

        resolve('promise 0')

        promise1.then((arg) => {
            console.log('promise1.then', arg)
        }) // 第 2 個進入任務佇列
    })

f00().then((arg) => {
    console.log('f00.then', arg)
}) // 第 3 個進入任務佇列

console.log('end here')

// 輸出順序如下
// start here
// first promise constructor
// second promise constructor
// end here
// promise1.then promise 1
// f00.then promise 0
// setTimeout here
