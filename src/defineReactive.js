/**
 * 将对象变成响应式的
 * @param obj
 * @param key
 * @param val
 * @returns {*}
 */
import observe from './observe'
import Dep from './Dep'

export default function defineReactive(obj, key, val) {

  const dep = new Dep()

  // 如果参数就只有两个，那么val的值就是obj[key]
  if(arguments.length === 2) {
    val = obj[key]
  }

  // 对对象的子属性进行响应式处理
  let childOb = observe(val)

  Object.defineProperty(obj, key, {
    get() {
      console.log("你访问了" + key + "的属性值！")
      // 如果现在是处于依赖收集阶段
      if(Dep.target) {
        dep.depend()
        // 如果有子元素，那么子元素的依赖也要收集
        if(childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      console.log("你设置了" + key + "的属性值为：" + newValue)
      val = newValue
      // 对新设置的值也要进行响应式处理，因为新设置的值可能是对象
      childOb = observe(val)

      // 数据改变，通知dep
      dep.notify()
    }
  })
}
