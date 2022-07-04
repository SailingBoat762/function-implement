const { type } = require("os");

function MyPromise(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCb = [];
    this.onRejectedCb = [];

    let resolve = (value) => {
        if (this.state === "pending") {
            this.state = "fulfilled";
            this.value = value;
            this.onFulfilledCbs.forEach((cb) => cb(value));
        }
    };

    let reject = (reason) => {
        if (this.state === "pending") {
            this.state = "rejected";
            this.value = reason;
            this.onRejectedCbs.forEach((cb) => cb(reason));
        }
    };

    executor(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilledCb, onRejectedCb) {

    let self = this

    RealOnFulfilledCb =
        typeof onFulfilledCb === "function" ? onFulfilledCb : (v) => v;
    RealOnRejectedCb =
        typeof onRejectedCb === "function" ?
        onRejectedCb :
        (v) => {
            throw v;
        };

    if (self.state === "fulfilled") {
        //已经fulfilled，在promise的构造函数内部调用新promise的resolve，状态穿透到外部，new Promise何时settle取决于外部promise何时settle
        let promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (typeof onFulfilledCb !== 'function') {
                        resolve(self.value)
                    } else {
                        let val = onFulfilledCb(self.value);
                        resolvePromise(promise2, val, resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }

            }, 0)
        });
        return promise2;
    } else if (self.state === "rejected") {
        //同理
        let promise2 = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if (typeof onRejectedCb !== 'function') {
                        reject(self.reason)
                    } else {
                        let val = onRejectedCb(self.reason);
                        resolvePromise(promise2, val, resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            }, 0)
        });
        return promise2;
    } else {
        let promise2 = new MyPromise((resolve, reject) => {

            // 将onFulfilledCb和onRejectedCb添加到对应的数组中,当promise的状态发生变化时,会调用对应的回调函数封装，回调中的resolve和reject会被调用，导致then（）返回的promise会settle
            //相当于then()返回的promise被延迟了，一个promise，当外部promise被settle时，内部promise也会被settle
            self.onFulfilledCbs.push(() => {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilledCb !== 'function') {
                            resolve(self.value)
                        } else {
                            let val = onFulfilledCb(self.value);
                            resolvePromise(promise2, val, resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })

            self.onRejectedCbs.push(() => {
                setTimeout(() => {
                    try {
                        if (typeof onRejectedCb !== 'function') {
                            reject(self.reason)
                        } else {
                            let val = onRejectedCb(self.reason);
                            resolvePromise(promise2, val, resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            })
        });
        return promise2;
    }
};

function resolvePromise(promise2, val, resolve, reject) {

    let self = this

    //防止循环引用，虽然我也没看懂
    if (promise2 === val) {
        return TypeError('the same promise');
    }


    if (val && typeof val === 'object' || typeof val === 'function') {
        let used

        let then = val.then
        if (typeof then === 'function') {
            val.then(
                (val) => {
                    used = true
                        //递归，一直到val返回的是一个普通值，上文中then()中的resolve（）层层传递，使用这个普通值resolve（）
                    resolvePromise(promise2, val, resolve, reject)
                },
                (reason) => {
                    used = true
                    resolvePromise(promise2, reason, resolve, reject)
                }
            )
        }


    }


}