function a(func, initValue) {
    const arr = this
    let base = typeof initValue === 'undefined' ? arr[0] : initValue
    const startPoint = typeof initValue === 'undefined' ? 1 : 0

    arr.slice(startPoint).forEach((value, index) => {
        base = func(base, value, index + startPoint, arr)
    })
}
