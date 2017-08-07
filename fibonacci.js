function fibonacci(n) {
  var _a = [0, 1]
  function _f(n) {
    var _r = _a[n]
    if (typeof _r === 'undefined') {
      _a[n] = _r = _f(n-1) + _f(n-2)
    }
    return _r
  }
  return _f(n)
}
