export default function parsePath(str) {
  const segments = str.split('.')

  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if(!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
