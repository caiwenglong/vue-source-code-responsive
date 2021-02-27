## 依赖收集的流程
 1. 首先调用observe方法实例化一个Observer对象
 2. 实例化Observer对象，遍历传入的Data,逐个调用defineReactive,将数据进行响应式处理
    每个Observer的实例身上都有这么一个dep this.dep = new Dep()
    Observer对象作用：
      1. 将一个正常的object对象的每个子属性转换成响应式的（也就是可以被监测的）object
      2. 将产生的实例添加到__ob__上,提供后续观测数据使用，以及避免被重复实例化
 3. 调用defineReactive()方法对数据进行响应式处理
    1. 通过Object.defineProperty里面的set和get对数据进行拦截，
    2. 在get() 里面收集依赖，在set() 里面触发依赖

 4. Dep类：每一个数据都有Dep类的实例，Dep类的实例是依附于数据而出来的，它是用来管理依赖数据的watcher类的实例
 
 5. watcher类： Watcher：扮演观察者的角色，进行观察者函数的包装处理。如render()函数，会被进行包装成一个Watcher实例
