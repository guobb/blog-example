var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
let articles = require('./routes/articles');
const session = require('express-session');
const MongoStore = require('connect-mongo/es5')(session);
const flash = require('connect-flash');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 设置一下对于html格式的文件，渲染的时候委托ejs渲染方法进行渲染
// app.engine('html',require('ejs').__renderFile);

// 使用了会话中间件之后，req.session
app.use(session({
    secret: 'blog-example',
    resave: false,
    saveUninitialized: true,

    // 指定保存的位置
    /**
     * 设置MongoStore实例，把会话信息存储到数据库中，
     * 以避免重启服务器会话丢失
     */
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port,
    })
    //cookie: { secure: true }
}));

app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置模版的中间件
app.use((req, res, next) => {

    //res.locals 才是真正的渲染模版的对象
    res.locals.user = req.session.user;

    // req.flash 一个参数表示取值 两个表示赋值 ,返回市数组
    res.locals.susscess = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});


app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
