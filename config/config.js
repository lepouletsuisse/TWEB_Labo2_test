var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
var mongoURI = "192.168.99.100";
var labName = "TWEB2";

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'tweb-labo2-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://' + mongoURI + '/' + labName + '-dev',
    jwtsecret: process.env.JWTSECRET ||'supersecretsharedkey'
},

  test: {
    root: rootPath,
    app: {
      name: 'tweb-labo2-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://' + mongoURI + '/' + labName + '-test',
    jwtsecret: process.env.JWTSECRET ||'supersecretsharedkey'
  },

  production: {
    root: rootPath,
    app: {
      name: 'tweb-labo2-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://' + mongoURI + '/' + labName + '-prod',
    jwtsecret: process.env.JWTSECRET ||'supersecretsharedkey'
  }
};

module.exports = config[env];
