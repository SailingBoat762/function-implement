let activeEffect;

const effect = function(effectFn, ...args) {
    activeEffect = effect;
    let res = effectFn.apply(null, args);
    return res;
};

let obj = {
    message: "hello",
    count: 0,
};

const map = new WeakMap();

const proxy = new Proxy(obj, {
    get(t, k, r) {
        let targetMap = map.get(target);

        if (!targetMap) {
            map.set(target, new Map());
        }

        let dep = targetMap.get(k);

        if (!dep) {
            targetMap.set(k, new Set());
        }

        if (activeEffect) {
            dep.add(k, activeEffect);
        }

        if (k in t) {
            return t;
        }
    },

    set(t, k, r) {
        let target = map.get(t);
        let dep = target.get(k);
        [...dep].forEach((cb) => {
            cb();
        });
        return true;
    },
});

function hello(obj) {
    console.log(obj.message);
    console.log(obj.count);
}

effect(hello, obj);

setTimeout(() => {
    obj.count++;
}, 1000);