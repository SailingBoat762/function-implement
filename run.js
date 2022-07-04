var arr1 = [1, 2, [3],
    [1, 2, 3, [4, [2, 3, 4]]]
];

function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
        //arr = Array.prototype.concat.apply([],arr);
    }
    return arr;
}
const arr2 = flatten(arr1); //[1, 2, 3, 1, 2, 3, 4, 2, 3, 4]