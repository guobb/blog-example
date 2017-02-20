const express = require('express');

// 生成一个路由实例
const router = express.Router();

// 请求一个空白发表文章页面
router.get('/add', (req, res) => {
    res.render('article/add');
});

// 提交文章数据
router.post('/add', (req, res) => {
    res.send('article/add')
});

module.exports = router;






