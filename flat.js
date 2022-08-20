function flatten(arr) {
  let res = []
  for (let item of arr) {
    if (Array.isArray(item)) {
      res.concat(flatten(arr))
    } else {
      res.push(item)
    }
  }
}

function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
}
