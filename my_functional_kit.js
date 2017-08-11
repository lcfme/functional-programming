// Basic Functional Programming Functions


const curry = (fn) => {
  if (typeof fn !== 'function') throw new Error('argument must be function')
  const len = fn.length
  const _f = (self) => {
    return (args) => {
      return (a) => {
        const _args = [...args]
        _args.push(a)
        if (_args.length === len) {
          return fn.call(null, ..._args)
        }
        return self(self)(_args)
      }
    }
  }
  return _f(_f)([])
}

const compose = (...fns) => {
  const len = fns.length
  for (var i = 0; i < len; i++) {
    if (typeof fns[i] !== 'function') {
      throw new Error('arguments must be function')
    }
    return (x) => {
      const _f = (self) => {
        return (n) => {
          return (r) => {
            if (n === 0) {
              return fns[n].call(null, r)
            }
            return self(self)(n - 1)(fns[n].call(null, r))
          }
        }
      }
      return _f(_f)(len - 2)(fns[len-1].call(null, x))
    }
  }
}

const map = (f) => {
  return (x) => {
    return f(x)
  }
}


class Functor {
  static of(v) {
    return new Functor(v)
  }
  constructor(v) {
    this.value = v
  }
  map (f) {
    return Functor.of(f(this.value))
  }

}


class Maybe extends Functor {
  static of(v) {
    return new Maybe(v)
  }
  map (f) {
    return !!this.value ? Maybe.of(f(this.value)) : Maybe.of(null)
  }
}

class Either extends Functor {
  static of(left, right) {
    return new Either(left, right)
  }
  constructor(left, right) {
    super()
    this.left = left
    this.right = right
  }
  map(f) {
    return this.right ? Either.of(this.left, f(this.right)) : Either.of(f(this.left), this.right)
  }
}

class Ap extends Functor {
  static of(v) {
    return new Ap(v)
  }
  ap(functor) {
    return Ap.of(this.value(functor.value))
  }
}

class Monad extends Functor {
  static of(v) {
    return new Monad(v)
  }
  join() {
    return this.value
  }
  flatMap(f) {
    return Monad.of(f(this.value)).join()
  }
}
