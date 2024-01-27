setTimeout(() => {
    console.log('1ms', Date.now())
}, 1)

setTimeout(() => {
    console.log('0ms', Date.now())
}, 0)

// 0ms 1706318520636
// 1ms 1706318520639
// 最小延遲時間為 4ms
