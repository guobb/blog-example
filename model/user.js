// 引入模块
const mongoose = require('mongoose');

//mongoose.connect('mongodba://127.0.0.1:12345');

/**
 *  定义模型 确定数据库的表结构
 */

let userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// 定义model
let userModel = mongoose.model('', userSchema);

module.exports = userModel;