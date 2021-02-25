/**
 * 数组在正常情况下是不能被响应式
 * vue中数组之所以能响应式，因为它改写了数组的 push、pop、shift、unshift、splice、sort、reverse 这七个方法
 * 也就是扩展这七个方法，在这七个方法的基础上添加新的一些功能，这数组的方法都是定义在Array.prototype上面的
 *
 * 1、要以Array.prototype为原型创建一个对象arrayPrototypeMethods: Object.create(Array.prototype)
 * 2、
 */

import { def } from './util'

/*
*  以Array.prototype为原型创建一个对象：
*     使用Object.setPrototypeOf(a, arrayMethods) 或者
*     a.__proto__ = arrayMethods
* */
export const arrayPrototypeMethods = Object.create(Array.prototype)

// 需要改写的数组方法
const arrayMethodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
]

arrayMethodsNeedChange.forEach(methodName => {
  // 备份原来的方法

  const original = arrayPrototypeMethods[methodName]

  /**
   * def 不仅能使对象的属性变成响应式的，也能使方法变成响应式的
   */
  def(arrayPrototypeMethods, methodName, function () {
    // original() // 函数通过()括号执行，上下文一般都是window对象,所以不能直接调用

    /**
     * apply 作用是用来改变函数的上下文对象，也就是改变this的指向
     * this: 这边的this指向，谁调用这个方法就指向谁，比如 [1,2].push(4)，则这边的this指向的就是[1,2]这个数组
     * arguments: 就是这个方法的参数, 比如 [1,2].push(4, 5, 6) 那么arguments就是 4，5，6
     */
    original.apply(this, arguments)
  }, false)
})
