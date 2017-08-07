const curry = (fn) => {
  const length = fn.length
  const f = (args) => {
    return function (a) {
      const _args = [...args]
      _args.push(a)
      if (_args.length === length) {
        return fn.call(null, ..._args)
      } else {
        return f.call(null, _args)
      }
    }
  }
  return f.call(null, [])
}
