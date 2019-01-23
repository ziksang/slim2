const a = 10
const b = a + 10

let mm = new Proxy({
  name: 1
}, {
  get (target, key) {
    return target[key] 
  }
})

console.log(mm.name)
export default b