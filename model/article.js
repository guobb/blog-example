// 引入模块
const mongoose = require('mongoose');

//mongoose.connect('mongodba://127.0.0.1:12345');

/**
 *  定义模型 确定数据库的表结构
 */

let articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    img: String,
    user: {type:mongoose.Schema.ObjectId,ref:'user'}, // 类型是主键类型，引用的模型是user
    // 发表日期，类型市Date，默认值是now，当前时间
    createAt: {type: Date, default: Data.now}
});

// 定义model
let articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;