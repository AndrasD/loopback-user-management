'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  //var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
  var mysqlDs = app.dataSources.mysqlDs;

  //create all models
  async.parallel({
    user: async.apply(createUser),
    accessToken: async.apply(createAccessToken),
  }, function(err, results) {
    if (err) throw err;
    console.log('> models created sucessfully');
  });
  
  //create user
  function createUser(cb) {
    mysqlDs.automigrate('user', function(err) {
      if (err) return cb(err);
      var User = app.models.user;
      User.create([{
        email: 'foo@bar.com',
        password: 'foobar',
      }, {
        email: 'john@doe.com',
        password: 'johndoe',
      }, {
        email: 'jane@doe.com',
        password: 'janedoe',
      }], cb);
    });
  }

  //create accessToken
  function createAccessToken(cb) {
    mysqlDs.automigrate('accessToken', function(err) {
      if (err) return cb(err);
    });
  }

};
