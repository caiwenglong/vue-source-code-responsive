/**
 * 设置对象的属性是否是可枚举的
 * @param data
 * @param key
 * @param value
 * @param enumerable
 */
export function def(data, key, value, enumerable) {
  Object.defineProperty(data, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}
