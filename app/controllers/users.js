
/*
|--------------------------------------------------------------------------
| Users Controller
| This is More of an example of a Resource
|--------------------------------------------------------------------------
*/

exports.index = function *(){
     this.body = ('user index');
};

exports.new = function *(){
     this.body = 'new user';
};

exports.create = function *(){
     this.body = 'create user';
};

exports.show = function *(){
     this.body = 'show user ' + this.params.user;
};

exports.edit = function *(){
     this.body = 'edit user ' + this.params.user;
};

exports.update = function *(){
     this.body = 'update user ' + this.params.user;
};

exports.destroy = function *(){
     this.body = 'destroy user ' + this.params.user;
};