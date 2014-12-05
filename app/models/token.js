
var  mongoose       = require('mongoose'),
     Schema         = mongoose.Schema,
     Email          = require('../services/email');

/*
|--------------------------------------------------------------------------
| token Model
|--------------------------------------------------------------------------
*/

var tokenSchema = new Schema({
     type:          { type: String },
     user:          { type: Schema.Types.ObjectId, ref: 'User' },
     created_at:    { type: Date, default: Date.now },
     updated_at:    { type: Date, default: Date.now }
});

/*
|--------------------------------------------------------------------------
| Email the Token After Save
|--------------------------------------------------------------------------
*/

tokenSchema.post('save', function(token) {
     token.populate('user', function(err, token) {
          Email.forgotten(token);
     });
});


/*
|--------------------------------------------------------------------------
| Export that motha'
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model('Token', tokenSchema);