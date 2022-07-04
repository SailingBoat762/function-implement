class Eventemitter() {
    constructor() {
        this.cache = {}
    }

    on(name, cb) {
        let dep = this.cache[name]
        if (dep) {
            dep.push(cb)
        } else(
            dep = [cb]
        )
    }

    off(name, cb) {
        let dep = this.cache[name]
        if (dep) {
            const idx = dep.findIndex((v) => {
                return v === cb
            })
            if (idx > 0) {
                dep.splice(idx, 1)
            }

        }
    }

    emit(name, once = false, ...args) {

        let dep = this.cache[name].slice()

        if (dep) {
            dep.forEach(element => {
                element.apply(null, args)
            });
        }

        if (once) {
            delete this.cache[name]
        }

    }
}