
/*
|--------------------------------------------------------------------------
| Dependencies
|--------------------------------------------------------------------------
*/

var  koa            = require('koa'),
     bodyParser     = require('koa-bodyparser'),
     session        = require('koa-session'),
     flash          = require('koa-flash'),
     passport       = require('koa-passport'),
     router         = require('koa-router'),
     render         = require('koa-swig'),
     path           = require('path'),
     mongoose       = require('mongoose'),
     _              = require('lodash'),
     app            = koa();



/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

var Config = require('./app/config/config');

app.use(bodyParser());
app.keys = [Config.sessionKey];
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router(app));


/*
|--------------------------------------------------------------------------
| Template Engine
|--------------------------------------------------------------------------
*/

render(app, {
     root:          path.join(__dirname, 'app/views'),
     autoescape:    true,
     cache:         false,
     ext:           'liquid'
});



/*
|--------------------------------------------------------------------------
| Init Auth
|--------------------------------------------------------------------------
*/

var User  = require('./app/models/user');

_.each(['local'], function(file, index) {
     require('./app/config/auth/' + file)(passport, User);
});

passport.serializeUser(function(user, done) {
     done(null, user._id);
});

passport.deserializeUser(function(id, done) {
     User.findOne({ _id: id }, function (err, user) {
          if(!err) done(null, user);
          else done(err, null)  
     });
});


/*
|--------------------------------------------------------------------------
| Load Routes
|--------------------------------------------------------------------------
*/

var routes = require('./app/routes.js')(app);


/*
|--------------------------------------------------------------------------
| Get DB
|--------------------------------------------------------------------------
*/

mongoose.connect(Config.database);


/*
|--------------------------------------------------------------------------
| Listen to that server purr...
|--------------------------------------------------------------------------
*/

app.listen(3000, function() {
     console.log('Running...');
});



