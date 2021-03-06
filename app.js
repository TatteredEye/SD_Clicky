var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var fs = require('fs');
var flash = require('connect-flash');
var session = require('express-session')

var passport = require('passport');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// register partial
hbs.registerPartial("alerts", fs.readFileSync("views/alerts.hbs", 'utf8'));
hbs.registerPartial("studentsidebar", fs.readFileSync("views/studentSidebar.hbs", 'utf8'));
hbs.registerPartial("teachersidebar", fs.readFileSync("views/teacherSidebar.hbs", 'utf8'));
hbs.registerHelper("addone", function(value, options) {
  return parseInt(value) + 1;
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'haha'
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


console.log("Running on port 3000");
module.exports = app;
