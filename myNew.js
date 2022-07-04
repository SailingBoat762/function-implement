function myNew(fn, ...args) {
    if (typeof fn !== 'function') {
        return new Error('not a function')
    }

    let result = {}
    if (fn.prototype !== null) {
        Object.setPrototypeOf(result, fn.prototype)
    }

    let res = fn.apply(result, args)
    if (res instanceof Object) {
        return res
    } else {
        return result
    }

}