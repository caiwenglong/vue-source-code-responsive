import Observer from './Observer'

/**
 *
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
