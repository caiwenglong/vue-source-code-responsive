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

/*
*  需要改写的数组方法有七个
*  其中可以往数组里面插入新值的方法要特殊处理，需要将插入的新值也变成响应式的
* */
const arrayMethodsNeedChange = [
  'push', // 向数组的最后一项添加参数
  'pop',  // 将数组的最后一项删除
  'shift', // 将数组的第一项删除
  'unshift', // 向数组的开始位置添加参数
  'splice', // arr.splice(开始位置, 删除几项, 要插入的项)
  'sort', // 排序
  'reverse', // 反转
]

arrayMethodsNeedChange.forEach(methodName => {

  // 备份原来的方法
  const original = arrayPrototypeMethods[methodName]

  /**
   * def 不仅能使对象的属性变成响应式的，也能使方法变成响应式的
   * 这里使用def来改写数组原来的方法
   */
  def(arrayPrototypeMethods, methodName, function () {
    // original() // 函数通过()括号执行，上下文一般都是window对象,所以不能直接调用

    /**
     * 添加新的功能
     * 数组方法中有三个是向数组中添加项的，新添加的项可能是数组，可能是对象
     * 所以新添加的项要进行响应式处理
     */
    const ob = this.__ob__ // 获取ob
    // arguments 是类数组，上面没有数组的那些方法，所以需要转成数组
    const _args = [...arguments]
    let inserted = [] // 得到新添加的项
    switch(methodName) {
      case 'push':
      case 'unshift':
        inserted = _args
        break
      case 'splice':
        inserted = _args.slice(2) // arguments 是类数组，类数组没有splice，所以需要转成数组
    }

    if(inserted.length) {
      ob.observeArray(inserted)
    }

    // 数组被改变了，要通知dep
    ob.dep.notify()

    /**
     * 调用原来的方法
     * apply 作用是用来改变函数的上下文对象，也就是改变this的指向
     * this: 这边的this指向，谁调用这个方法就指向谁，比如 [1,2].push(4)，则这边的this指向的就是[1,2]这个数组
     * arguments: 就是这个方法的参数, 比如 [1,2].push(4, 5, 6) 那么arguments就是 4，5，6
     * return: 这个方法必须要返回值，比如pop()方法返回的就被删除的项
     */
    return original.apply(this, _args)
  }, false)
})
