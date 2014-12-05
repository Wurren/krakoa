
/*
|--------------------------------------------------------------------------
| Route Dependencies
|--------------------------------------------------------------------------
*/

var  Resource       = require('koa-resource-router'),
     Root           = require('./controllers/root'),
     Users          = require('./controllers/users'),
     Auth           = require('./controllers/auth'),
     Admin          = require('./controllers/admin'),
     Signup         = require('./controllers/signup');


module.exports = function(app) {

     /*
     |--------------------------------------------------------------------------
     | Root
     |--------------------------------------------------------------------------
     */

     app.get('/', Root.getIndex);


     /*
     |--------------------------------------------------------------------------
     | Resources
     |--------------------------------------------------------------------------
     */

     var users = new Resource('users', Users);
     app.use(users.middleware());


     /*
     |--------------------------------------------------------------------------
     | Signup
     |--------------------------------------------------------------------------
     */

     app.get('/signup', Signup.getIndex);

     app.post('/signup', Signup.postIndex);


     /*
     |--------------------------------------------------------------------------
     | Authentication
     |--------------------------------------------------------------------------
     */

     app.all('/admin*', Auth.isAuthed);

     app.get('/login', Auth.local);

     app.post('/login', Auth.login);

     app.get('/logout', Auth.logout);

     app.get('/forgotten', Auth.forgottenIndex);
     app.post('/forgotten', Auth.forgottenPost);
     
     app.get('/forgotten/reset/:token', Auth.forgottenResetIndex);
     app.post('/forgotten/reset/:token', Auth.forgottenReset);

     app.get('/admin', Auth.isAuthed, Admin.getIndex);


}