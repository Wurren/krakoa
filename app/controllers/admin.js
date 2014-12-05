

var  _         = require('lodash'),
     Errors    = require('../services/errors');


/*
|--------------------------------------------------------------------------
| Admin Index page
|--------------------------------------------------------------------------
*/

exports.getIndex = function *() {
     yield this.render('admin/index', {  
          user : this.req.user, 
          errors: this.flash.errors 
     });
}


