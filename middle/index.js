/**
 * Created by apple on 17/2/20.
 */

// 要求下面的路由必须登录后才能访问
exports.checkLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.flash('error', '未登录');
        req.redirect('/users/login');
    }
};


// 要求下面的路由必须－未－登录后才能访问
exports.checkNotLogin = (req, res, next) => {
    if (req.session.user) {
        req.flash('error', '已登录');
        req.redirect('/');
    } else {
        next();
    }
};