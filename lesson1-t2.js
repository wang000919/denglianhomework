const JSEncrypt = require("./jsencrypt.min.js");
const crypto = require('crypto');

const data = "wang00091976008";

const encryptor = new JSEncrypt({ default_key_size: '2048' });
const privateKey = encryptor.getPrivateKey();
const publicKey = encryptor.getPublicKey();
try {
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);

    // 计算数据的 SHA256 哈希
    const hash = crypto.createHash('sha256').update(data).digest();

    // 对哈希进行签名
    const jsSignature = encrypt.sign(hash.toString('hex'), () => {
        return hash.toString('hex');
    }, 'sha256');

    if (jsSignature) {
        console.log("jsencrypt 签名生成成功");

        const decrypt = new JSEncrypt();
        decrypt.setPublicKey(publicKey);

        const jsIsValid = decrypt.verify(hash.toString('hex'), jsSignature, () => {
            return hash.toString('hex');
        });

        if (jsIsValid) {
            console.log('jsencrypt 签名验证成功');
        } else {
            console.log('jsencrypt 签名验证失败');
        }
    } else {
        console.log('jsencrypt 无法生成签名');
    }
} catch (error) {
    console.log('jsencrypt 签名错误:', error.message);
}