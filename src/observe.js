import Observer from './Observer'

/**
 * observe方法只为对象/数组 实例一个Observer类的实例，而且就只会实例化一次，并且需要数据是可配置的时候才会实例化Observer类实例。
 */
export default function observe(obj) {
  if(typeof obj != 'object') return
  let ob;
  if(typeof obj.__ob__ !== 'undefined') {
    ob = obj.__ob__ // __ob__其实就是存储Observer实例的
  } else {
    ob = new Observer(obj) // 每次new一下就会产生新的实例
  }
  return ob
}
