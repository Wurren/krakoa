
var  swig           = require('swig'),
     Config         = require('../config/config'),
     Mandrill       = require('node-mandrill')(Config.email.mandrill_key);

/*
|--------------------------------------------------------------------------
| Welcome Email
|--------------------------------------------------------------------------
*/

exports.welcome = function(user) {

     var html = swig.renderFile(process.cwd() + '/app/views/emails/welcome.html', { 
          user: user,
          base_url: Config.base_url 
     });

     var email = {
          to:       	[{ email: user.email, name: user.firstName || 'you', type: 'to' }],
          from_email: 	Config.email.welcome.from,
          from_name:     Config.email.welcome.name,
          subject:  	Config.email.welcome.subject,
          html:          html    
     }

     Mandrill('/messages/send', { message: email }, function(error, response){
          if (error) return console.log(error);
     });

}



/*
|--------------------------------------------------------------------------
| Forgotten Password Email
|--------------------------------------------------------------------------
*/

exports.forgotten = function(token) {

     var  html = swig.renderFile(process.cwd() + '/app/views/emails/forgotten.html', { 
          token: token,
          base_url: Config.base_url 
     });

     var email = {
          to:       	[{ email: token.user.email, name: token.user.firstName || 'you', type: 'to' }],
          from_email: 	Config.email.forgotten.from,
          from_name:     Config.email.forgotten.name,
          subject:  	Config.email.forgotten.subject,
          html:          html    
     }

     Mandrill('/messages/send', { message: email }, function(error, response){
          if (error) return console.log(error);
     });

}

