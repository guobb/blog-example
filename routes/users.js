const express = require('express');

const userModel = require('../model/user');

const validate = require('../middle/index.js');

const crypto = require('crypto');

// 生成一个路由实例
const router = express.Router();

// 用户注册,当用户通过get方法请求 /users/reg的时候，去执行此回调
// 要求登录才能访问
router.get('/reg', validate.checkNotLogin, (req, res) => {
    res.render('user/reg');
});

// 提交用户注册的表单
router.post('/reg', validate.checkNotLogin, (req, res) => {

    let user = req.body;

    user.avatar = 'https://secure.gravatar.com/avatar' + md5(user.email);
    user.password = md5(user.password);
    userModel.create(user, (err, doc) => {
        if (err) {
            req.flash('error', '注册失败');
            res.redirect('back'); // 返回上一个页面
        } else {
            // 把保存之后的用户放置到此用户会话的user属性上
            req.session.user = doc;
            // 增加一个成功的提示
            req.flash('success', '注册成功');
            // req.session.success = '注册成功';
            res.redirect('/');
        }
    })
});

// 用户登录
router.get('/login', validate.checkNotLogin, (req, res) => {
    res.render('user/login')
});

// 提交用户注册表单
router.post('/login', validate.checkNotLogin, (req, res) => {
    let user = req.body;
    userModel.findOne(user, (err, user) => {
      if(err) {
          req.flash('error',err);
          res.redirect('back');
      } else{
          req.session.user = user;
          req.flash('success','登录成功');
          res.redirect('/');
      }

    })

});

// 退出登录
router.get('/logout', validate.checkLogin, (req, res) => {

    req.session.user = null;
    req.redirect('/');
});
module.exports = router;

function md5(str) {

    // hex 十六进制
    return crypto.createHash('md5').update(str).digest('hex')
}






