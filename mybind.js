function myBind(ctx, ...args) {
    if (typeof this !== "function") {
        return new Error("not a function");
    }

    // 保存要bind的function
    const self = this;

    function wrap(...wrapperArgs) {
        // 处理new的情况
        self.apply(this instanceof wrap ? this : ctx, [
            ...args,
            ...wrapperArgs,
        ]);

        console.log("inner", this);
    }

    return wrap;
}

Function.prototype.myBind = myBind;

function test() {
    console.log("this", this);
    console.log("this", this.name);
}

obj = {
    name: "robot",
};

let binded = test.myBind(obj);

new binded();
binded();

function Anew() {}

console.log("Anew", new Anew());