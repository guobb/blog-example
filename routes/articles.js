const express = require('express');
const articleModel = require('../model/article');
const multer = require('multer');

// 生成一个路由实例
const router = express.Router();

/**
 * 指定一个文件元素的存储方式
 */
const storage = multer.diskStorage({
    // destination保存的文件路径目标
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    // 指定存储的文件名
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '.' + file.mimetype.slice(file.mimetype.indexOf('/') + 1));
    }
});

// 请求一个空白发表文章页面
router.get('/add', (req, res) => {
    res.render('article/add',{article:{}});
});

// 提交文章数据
router.post('/add', storage.single('img'), (req, res) => {
    let article = req.body;


    let _id = article._id;

    if (_id) {// 有值表示修改

        // set 要更新的字段
        let set = {
            title: article.title,
            content: article.content
        };
        if (req.file) { // 如果新上传了文件，那么更新img字段
            article.img = '/images/' + req.file.filename;
        }

        articleModel.update({_id: id}, {$set: set}, (err, acticle) => {
            if (err) {
                req.flash('error', '更新文章失败');
                return res.redirect('back');
            } else {
                req.flash('success', '更新文章成功');
                return res.redirect('/');
            }
        })

    } else {

        let user = req.session.user;
        article.user = user;
        articleModel.create(article, (err, article) => {
            if (err) {
                req.flash('error', '发表文章失败');
                return res.redirect('back');
            } else {
                req.flash('success', '发表文章成功');
                return res.redirect('/');
            }
        })

    }


});


// 增加文章的详情页
router.get('/detail/:id', (req, res) => {
    let _id = req.params._id;
    articleModel.findById(_id, (err, article) => {
        res.render('article/detail', {article: article});

    });
});

// 删除一个文章列表
router.get('/delete/:id', (req, res) => {
    let _id = req.params._id;
    articleModel.remove({_id: req.params._id}, (err, result) => {
        if (err) {
            req.flash('success', '删除失败');
            res.redirect('back');
        } else {
            req.flash('success', '删除成功');
            res.redirect('/');
        }
    });
});


// 跳转到修改页面

router.get('/update/:id', (req, res) => {
    let _id = req.params._id;
    articleModel.findById(_id, (err, article) => {
        res.render('article/add', {article: article});

    });
});

module.exports = router;






