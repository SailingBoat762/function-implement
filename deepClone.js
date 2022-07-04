function clone(obj) {
    if (typeof obj !== "object" && obj == null) return;

    let sub = Array.isArray(obj) ? [] : {};

    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (typeof obj[k] === "object") {
                sub[k] = clone(obj[k]);
            } else {
                sub[k] = obj[k];
            }
        }
    }

    return sub;
}

let abc = clone({
    a: {
        A: 12,
    },
});

console.log(abc);