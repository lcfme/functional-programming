const factory = (fn) => {
	return (n) => {
		return fn(fn, n)
	}
}

const count = (self, n) => {
	if (n >= 10) {
		return n
	} else {
		return self(self, n + 1)
	}
}

const run = factory(count)

console.log(run(0))