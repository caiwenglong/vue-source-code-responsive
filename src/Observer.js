import { def } from './util'
import defineReactive from './defineReactive'
import { arrayPrototypeMethods } from './array'
/**
 * Observer是一个类，这样用大写字母开头
 * 功能是将一个正常的object对象的每个子属性转换成响应式的（也就是可以被监测的）object
 * 将产生的实例添加到__ob__上
 * 每创建一个类就要想一件事，那就是这个类要如何被实例化
 */
export default class Observer {
  constructor(value) { // 构造函数接收传递进来的值，每次new就会自动调用构造函数
    // Observer会给传递进来的value添加__ob__属性，而且这个__ob__是不可枚举的
    def(value, '__ob__', this, false) // 类的this是值这个类的实例

    if(Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayPrototypeMethods)
    } else {
      this.work(value)
    }
  }

  work(value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }
}
