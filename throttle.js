// function throttle(fn, delay) {
//     let flush = true;
//     let cachedArgs;
//     let cachedThis;

//     return function wrapper(...args) {
//         if (flush === true) {
//             flush = false;
//             fn.apply(this, args);
//             setTimeout(() => {
//                 flush = true;
//                 if (cachedArgs && cachedThis) {
//                     wrapper.apply(cachedArgs, cachedThis);
//                 }
//             }, delay);
//         } else {
//             cachedArgs = args;
//             cachedThis = this;
//             return;
//         }
//     };
// }

function throttle(func, delay) {
    let timer = null;
    let startTime = Date.now();

    return function() {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        const context = this;
        const args = arguments;

        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(func, remaining);
        }
    }
}

const func = throttle(() => console.log(Date.now()), 1000)

setInterval(() => func(), 1000)