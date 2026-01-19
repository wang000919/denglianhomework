const crypto = require("./crypto-js.min.js")
let result, i = 0
console.time()
while (true) {
    result = crypto.SHA256("wang000919" + i).toString(crypto.enc.Hex)
    if (result.slice(0, 4).includes('0000')) {
        console.log('result-' + i + "：", result)
        console.timeEnd()
        break
    }
    i++
}