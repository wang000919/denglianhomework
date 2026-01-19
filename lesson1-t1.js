const crypto = require("./crypto-js.min.js")
let result, i = 0
console.log("1.直到满足 4 个 0 开头的哈希值，打印出花费的时间、Hash 的内容及Hash值。\n")
console.time()
while (true) {
    result = crypto.SHA256("wang000919" + i).toString(crypto.enc.Hex)
    if (result.slice(0, 4).includes('0000')) {
        console.log("花费时间：")
        console.timeEnd()
        console.log("Hash内容：", "wang000919" + i)
        console.log("Hash值：", result)
        break
    }
    i++
}
console.log("\n")
console.log("2. 再次运算直到满足 5 个 0 开头的哈希值，打印出花费的时间、Hash 的内容及Hash值。\n")
i = 0
console.time()
while (true) {
    result = crypto.SHA256("wang000919" + i).toString(crypto.enc.Hex)
    if (result.slice(0, 5).includes('00000')) {
        console.log("花费时间：")
        console.timeEnd()
        console.log("Hash内容：", "wang000919" + i)
        console.log("Hash值：", result)
        break
    }
    i++
}