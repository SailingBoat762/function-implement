// 归并排序
function mergeSort(arr) {
  // 拆分为只有一个元素的数组，递归结束
  if (arr.length === 1) return arr
  const midIdx = Math.floor(arr.length / 2)
  // 数组从中间拆成两半，分别递归mergeSort
  const leftArr = mergeSort(arr.slice(0, midIdx))
  const rightArr = mergeSort(arr.slice(midIdx))
  return merge(leftArr, rightArr)
}

function merge(leftArr, rightArr) {
  //保存merge结果
  const tmp = []
  //一直到其中一个数组为空结束
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      tmp.push(leftArr.shift())
    } else {
      tmp.push(rightArr.shift())
    }
  }
  // 把数组中剩余的元素排在concat后面
  return tmp.concat(leftArr).concat(rightArr)
}

const arr = [32, 12, 56, 78, 76, 45, 36]
const sortedArr = mergeSort(arr)
console.log('sortedArr', sortedArr)
