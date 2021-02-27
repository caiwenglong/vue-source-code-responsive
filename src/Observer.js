import { def } from './util'
import defineReactive from './defineReactive'
import { arrayPrototypeMethods } from './array'
import observe from './observe'
import Dep from './Dep'
/**
 * Observer是一个类，这样用大写字母开头
 * 功能是将一个正常的object对象的每个子属性转换成响应式的（也就是可以被监测的）object
 * 将产生的实例添加到__ob__上
 * 每创建一个类就要想一件事，那就是这个类要如何被实例化
 */
export default class Observer {
  constructor(value) { // 构造函数接收传递进来的值，每次new就会自动调用构造函数

    // 每个Observer的实例身上都伴随这一个dep
    this.dep = new Dep()

    // Observer会给传递进来的value添加__ob__属性，而且这个__ob__是不可枚举的
    // 将Observer类的实例挂载在__ob__属性上,提供后续观测数据使用，以及避免被重复实例化
    def(value, '__ob__', this, false) // 类的this是指这个类的实例

    if(Array.isArray(value)) {
      // 如果是数组，那么就将这个数组的原型指向以数组原型创建的对象，其实就是多个中间人了
      Object.setPrototypeOf(value, arrayPrototypeMethods)

      // 让这个数组变成可观察
      this.observeArray(value)
    } else {
      this.work(value)
    }
  }

  work(value) {
    for (let k in value) {
      defineReactive(value, k)
    }
  }

  // 数组的特殊遍历
  observeArray(arr) {
    // 这样写因为有一些特殊情况，在遍历过程中数组长度可能发生变化
    for (let i = 0, l = arr.length; i < l; i++) {
      // 将这个数组的每一项都进行响应式处理，因为数组里面可能包含着对象或者数组
      observe(arr[i])
    }
  }
}
