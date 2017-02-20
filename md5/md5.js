/**
 *  散列算法 摘要算法
 *
 *  把任意长度的字节组字符串转成固定长度的字符串
 *
 *  1. 不同的输入一定会产生不同的输出
 *
 *  2. 输出的结果不能反推输入的内容
 *
 *  3. 相同的输入一定会产生相同的输出
 */


let crypto = require('crypto');

console.log(crypto.getHashes());

crypto.createHash('md5').update('hello').digest();