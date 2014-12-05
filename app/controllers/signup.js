

var  User      = require('../models/user'),
     Errors    = require('../services/errors');

/*
|--------------------------------------------------------------------------
| Render Signup
|--------------------------------------------------------------------------
*/

exports.getIndex = function *() {
     yield this.render('signup', { 
          errors : this.flash.errors 
     });
}

/*
|--------------------------------------------------------------------------
| Render Signup
|--------------------------------------------------------------------------
*/

exports.postIndex = function *() {
     var params = this.request.body;
     try {
          var user = new User({
               email: params.email,
               password: params.password
          });
          yield user.persist();
          this.redirect('/login');
     } 

     catch(error) {
          this.flash =  { errors: Errors.convert(error.errors) };
          this.redirect('/signup');
     }
}

