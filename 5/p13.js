const arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8]
// console.log(arr1.slice(0, 3))
console.log(arr1.splice(0, 3).map((i) => i + 'a')) // ['0a', '1a', '2a']
console.log(arr1) // [3, 4, 5, 6, 7, 8]
console.log(arr1.splice(3, 1)) // [6]
console.log(arr1) // [3, 4, 5, 7, 8]
