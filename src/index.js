import observe from './observe'
import defineReactive from './defineReactive'
// const container = document.getElementById("container")
const obj = {
  a: {
    b:{
      c:{
        d: 123
      }
    }
  },
  i: [1,2,3],
  x: 10
}

observe(obj)

obj.i.splice(0, 2, [88, 99])

console.log(obj)


