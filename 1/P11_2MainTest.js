var a = 123
const foo = () => (a) => {
    console.log(this.a)
}
