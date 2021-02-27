/**
 * Watcher：扮演观察者的角色，进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例
 *
 */
import parsePath from './parsePath'
import Dep from './Dep'
let uid = 0;
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = uid ++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }

  update() {
    this.run()
  }

  run() {
    this.getAndInvoke(this.callback)
  }

  getAndInvoke(cb) {
    const value = this.get()
    if(value !== this.value || typeof value == 'object') {
      const oldValue = this.value
      this.value = value
      cb.call(this.target, value, oldValue)
    }
  }

  get() {
    let value
    // 这边进入了依赖收集阶段
    Dep.target = this // 将全局的位置设置为这个watcher实例本身，那么进入了依赖收集阶段了
    const obj = this.target
    try {
      value = this.getter(obj)
    } finally {
      Dep.target = null // 这边就结束了，将位置让给其他的watcher
    }
    return value
  }
}

