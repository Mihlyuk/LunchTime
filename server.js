var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport'),

    authFB = require('./src/controllers/authfb.js'),
    authVK = require('./src/controllers/authvk.js'),

    errorHandler = require('./src/errors/errorHandler.js'),
    errorLogger = require('./src/errors/errorLogger.js'),

    homeController = require('./src/controllers/home.js'),
    servicesController = require('./src/controllers/services.js'),
    serviceController = require('./src/controllers/service.js');

//TODO: Избавиться от хардкода(сделать конфиг) 
mongoose.connect('mongodb://localhost/lenka');

app.use(session({
    secret: 'appsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: new Date(Date.now() + 3600000)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('view engine', 'jade');
app.set('views', './src/pages');
app.get('/', homeController);
app.get('/services', servicesController);
app.get('/services/:id', serviceController);

app.use(errorLogger);
app.use(errorHandler);
app.use(express.static(__dirname + '/dist'));

app.get('/auth/fb', authFB());
app.get('/auth/vk', authVK());
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use(function(req, res) {
  res.render('404.jade');
});
var server = app.listen(3000, function() {
    console.log('Working 3000');
});
