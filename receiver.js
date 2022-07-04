let parent = {
    name: "xiaozhang",
    get value() {
        return this.name;
    },
};

let sub = {
    name: "xiaoxiaozhang",
};

let handler = {
    get(target, key, receiver) {
        // receiver 如果访问对象方法或getter ， 在拦截器中传递正确的this
        // return target[key];
        return Reflect.get(target, key, receiver);
    },
};

let proxy = new Proxy(parent, handler);

Object.setPrototypeOf(sub, proxy);

console.log(sub.value);