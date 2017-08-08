const curry = (fn) => {
  const len = fn.length
  const _f = (self) => {
    return (args) => {
      return (a) => {
        const _args = [...args]
        _args.push(a)
        if (_args.length === len) {
          return fn.call(null, ..._args)
        }
        return self.call(null, self).call(null, _args)
      }
    }
  }
  return _f(_f)([])
}

function foo(a, b, c, d) {
  return [a, b, c, d]
}

var ff = curry(foo)
