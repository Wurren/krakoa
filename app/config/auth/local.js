

var passport 		= require('koa-passport'),
	LocalStrategy 	= require('passport-local').Strategy,
	User 		= require('../../models/user');

/*
|--------------------------------------------------------------------------
| Local
|--------------------------------------------------------------------------
*/
module.exports = function(passport, User) {
	passport.use(new LocalStrategy({
		usernameField: "email",
		passwordField: "password"
	},
	function(email, password, done) {

		User.findOne({ email: email }, function(err, user) {

			if (err) return done(err); 

			if (!user) return done(null, false, { message: 'Incorrect email.' });

			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			
			return done(null, user);

		});

	}));
}

