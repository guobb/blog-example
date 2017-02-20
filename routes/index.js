var express = require('express');
var router = express.Router();

// 当用户访问／的时候，执行对应的回调函数
router.get('/', function(req, res, next) {
  // 用户数据渲染模版，从session 中获取用户信息
  // 第二个参数对象最后会合并到res.locals对象上，并渲染模版
  res.render('index', { user:req.session.user });
});

module.exports = router;
