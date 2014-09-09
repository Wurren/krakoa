

var mongoose  = require('mongoose'),
	Schema    = mongoose.Schema,
	crypto    = require('crypto'),
	thunkify  = require('thunkify'),
	Email 	  = require('../services/email');



/*
|--------------------------------------------------------------------------
| Validations
|--------------------------------------------------------------------------
*/

var validatePresenceOf = function(value) {
	return (this.provider && this.provider !== 'local') || (value && value.length);
};


/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
*/

var userSchema = new Schema({

	firstName: { 
		type: String 
	},

	lastName: { 
		type: String 
	},

	email: { 
		type:     String, 
		match:    [/.+\@.+\..+/, 'Please enter a valid email'], 
		required: 'An Email Address is required!',
	},

	hashed_password: {
		type:     String,
		validate: [validatePresenceOf, 'Password cannot be blank'],
		required: 'A Password is required!'
	},

	salt: String,

	created_at: { 
		type:     Date, 
		default:  Date.now 
	},

	updated_at: { 
		type:     Date, 
		default:  Date.now 
	}

});



/*
|--------------------------------------------------------------------------
| Post Save - Updated At
|--------------------------------------------------------------------------
*/

userSchema.pre('save', function(next){
	this.updated_at = new Date;
	if ( !this.created_at ) this.created_at = new Date;
	next();
});



/*
|--------------------------------------------------------------------------
| Virtual Password
|--------------------------------------------------------------------------
*/

userSchema.virtual('password').set(function(password) {
	this._password 			= password;
	this.salt 				= this.makeSalt();
	this.hashed_password 	= this.hashPassword(password);
}).get(function() {
	return this._password;
});


/*
|--------------------------------------------------------------------------
| Check Password
|--------------------------------------------------------------------------
*/

userSchema.pre('save', function(next) {
	// if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
	// 	return next(new Error('Invalid password'));
	// next();
	this._wasNew = this.isNew;
	next();
});


userSchema.post('save', function(user) {
	if(this._wasNew) Email.welcome(user);
});



/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

userSchema.path('email').validate(function (value, respond) {
	if( !this.isNew && this.email === value ) return respond(true);
	this.model('User').findOne({ email: value }, function (err, user) {
		(user) ? respond(false) : respond(true);                                                                                                                        
	});                                                                                                                                                  
}, 'This Email Address is already in use');



/*
|--------------------------------------------------------------------------
| Model Methods
|--------------------------------------------------------------------------
*/

userSchema.methods = {

	authenticate: function(plainText) {
		return this.hashPassword(plainText) === this.hashed_password;
	},

	makeSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	hashPassword: function(password) {
		if (!password || !this.salt) return '';
		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	},

	// Polyfil for Mongoose's lack of Promises on save
	persist: thunkify(function() {
		return this.save.apply(this, arguments);
	})

};



/*
|--------------------------------------------------------------------------
| Export that motha'
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model('User', userSchema);