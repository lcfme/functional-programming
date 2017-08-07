const factory = (f) => {
    return (a) => {
        return f(f, a)
    }
}

const fact = (self, n) => {
    return n < 2 ? 1 : n * self(self, n - 1)
}

const _f = factory(fact);
