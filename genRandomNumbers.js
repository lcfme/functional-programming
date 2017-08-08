function gen(n, m) {
  if (n < m) return;
  var _f = function (self, a) {
    var _a = [...a];
    var num = Math.ceil(Math.random() * n)
    if (_a.indexOf(num) > -1) {
      return self(self, _a);
    }
    _a.push(num);
    if (_a.length === m) {
      return _a;
    }
    return self(self, _a)
  }
  var _l = curry(_f)(_f);
  return _l([]);
}

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
