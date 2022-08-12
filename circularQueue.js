
// 循环队列
class queue {
    constructor(length) {
        this.queue = new Array(length)
        this.n = length
        this.head = 0
        // 初始时head和tail都处在0指针，
        this.tail = 0
    }

    // 入队
    enqueue(item) {
        // 环形队列，如果末尾元素下个元素是head，说明队列满了
        //  tail指向的位置是不保存数据的
        // (this.tail + 1) % n ， +1并取模求当前tail的下一个位置，当当前tail为n-1时，下一个位置为0，和普通队列不同，环形队列的tail只能取到n-1
        if ((this.tail + 1) % this.n === this.head) return false
        this.queue[this.tail] = item
        // +1取模，实现tail为n-1时，下一位为0
        this.tail = (this.tail + 1) % this.n
        return true
    }

    // 出队
    dequeue() {
        // 如果头尾指向同一个节点，那么队列为空
        if (this.tail === this.head) return null
        const res = this.queue[this.head]
        this.head = (this.head + 1) % this.n
        return res
    }


}