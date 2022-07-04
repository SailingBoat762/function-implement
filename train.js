// function throttle(fn, delay) {
//     let throttle = false;
//     return function(...args) {
//         if (!throttle) {
//             throttle = true;
//             setTimeout(() => {
//                 fn.apply(this, args);
//                 throttle = false;
//             }, delay);
//         }
//     };
// }
// let doc = throttle(console.log, 1000);

// setInterval(() => {
//     doc("hello");
// }, 100);

// function debounce(fn, delay) {
//     let timer;
//     return function(...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//             timer = undefined;
//         }, delay);
//     };
// }

// function debounce(func, wait) {
//     let timeout;
//     return function(...args) {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => {
//             func.apply(this, args);
//         }, wait);
//     };
// }
let deb = debounce(console.log, 1000);

setInterval(() => {
    deb("world");
}, 100);