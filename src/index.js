import observe from './observe'
import Watcher from './Watcher'
import defineReactive from './defineReactive'
// const container = document.getElementById("container")
const obj = {
  a: {
    b:{
      c:{
        d: 123
      }
    },
    e: {
      f: 1
    }
  },
  i: [1,2,3],
  x: 10
}

observe(obj)

new Watcher(obj, 'a.b.c.d', (val , oldValue) => {
  console.log("!!!!!" + val + oldValue)
})
new Watcher(obj, 'a.e.f', (val) => {
  console.log("!!!!!" + val)
})
obj.a.b.c.d = 100
obj.a.e = {
  f: 'f'

}
console.log(obj)


