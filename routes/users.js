const express = require('express');

let userModel = require('../model/user');

// 生成一个路由实例
const router = express.Router();

// 用户注册,当用户通过get方法请求 /users/reg的时候，去执行此回调
router.get('/reg', (req, res) => {
    res.render('user/reg');
});

// 提交用户注册的表单
router.post('/reg', (req, res) => {

    let user = req.body;

    userModel.create(user, (err, doc) => {
        if(err){
            res.redirect('back'); // 返回上一个页面
        }else{
            res.redirect('/');
        }
    })
});

// 用户登录
router.get('/login', (req, res) => {
    res.render('user/login')
});

// 提交用户注册表单
router.post('/login', (req, res) => {
    res.send('login')
});

// 退出登录
router.get('/logout', (req, res) => {
    res.send('user/logout')
});
module.exports = router;






