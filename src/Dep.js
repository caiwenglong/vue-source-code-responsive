/**
 * 在vue依赖收集中，谁是被观察目标？谁是观察者？
 * 显然：被依赖的数据就是被观察的目标，依赖数据的视图，组件、侦听器等这些都是观察者
 *
 */

/**
 * Dep类：每一个数据都有Dep类的实例，Dep类的实例是依附于数据而出来的，它是用来管理依赖数据的watcher类的实例
 *
 */
let uid = 0;
export default class Dep {
  constructor() {
    // 在dep中用数组存储自己的观察者
    this.id = uid++
    this.subs = []
  }

  // 添加订阅
  addSub(sub){
    this.subs.push(sub)
  }

  // 添加依赖
  depend() {
    if(Dep.target) {
      this.addSub(Dep.target)
    }
  }

  // 通知更新
  notify() {
    // 浅克隆一份观察者数组
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update() // 数据发生改变的时候让watcher 更新一下
    }
  }
}
