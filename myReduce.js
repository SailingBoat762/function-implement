Array.prototype.myReduce = function (fn, initial) {
    let value
    let arr = this
    let len = arr.length
    // 初始值的索引
    let k = 0
    if (initial) {
        value = initial
    } else {
        // 寻找初始值索引
        while (k < len && !(k in arr)) {
            k++
        }
        if (k >= len) {
            throw new Error('empty array')
        }
        // 初始值
        value = arr[k]
        // 循环开始索引
        k++
    }

    while (k < len && (k in arr)) {
        value = fn.call(undefined, value, arr[k], k, arr)
        k++
    }

    return value
}

const arr = [1,2,3]
const sum = (s,v) => s+v
const res = arr.myReduce(sum)
console.log(res); // 6