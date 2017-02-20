var express = require('express');
var router = express.Router();

const markdown = require('markdown').markdown;

const articleMode = require('../model/article');

// 当用户访问／的时候，执行对应的回调函数
router.get('/', function (req, res, next) {
    // 用户数据渲染模版，从session 中获取用户信息
    // 第二个参数对象最后会合并到res.locals对象上，并渲染模版
    // 先配置参数，然后再执行查询
    // 我们查出来的user是ID，需要通过populate转成对象
    articleMode.find().populate('user').exec((err, article) => {
        if (err) {
            req.flash('error', error);
            res.redirect('/');
        }

        articles.forEach((article) => {
            article.content = markdown.toHTML(article.content);
        })
    });

    res.render('index', {articles: articles});
});

module.exports = router;
