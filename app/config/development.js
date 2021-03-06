

/*
|--------------------------------------------------------------------------
| Application Config (Development)
|--------------------------------------------------------------------------
*/

exports = module.exports = {

	/*
	|--------------------------------------------------------------------------
	| Domain
	|--------------------------------------------------------------------------
	*/

	base_url: 'http://localhost:3000',

	/*
	|--------------------------------------------------------------------------
	| Email
	|--------------------------------------------------------------------------
	*/

	email: {
		mandrill_key: process.env.MANDRILL || '',
		welcome: {
			name: 'App',
			from: 'app@app.com',
			subject: 'Welcome to the app!'
		},
		forgotten: {
			name: 'App',
			from: 'app@app.com',
			subject: 'Heres your forgotten password reset link!'
		}
	},

	/*
	|--------------------------------------------------------------------------
	| Database
	|--------------------------------------------------------------------------
	*/

	database: 	'mongodb://localhost/test',
	sessionKey: 	'allyourbasearebelongtous',

}