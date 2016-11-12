var config = require('../../config/config.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-as-promised');
var jwt = require('jsonwebtoken');

module.exports = function(app){
    app.use('/auth', router);
};

router.post('/', function (req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    if(username === undefined || password === undefined){
        return next({status: 401, message: "Please provide credentials"});
    }
    User.findOne({
        'username': username
    })
    .then(function(user){
        if(user === null){
            throw new Error("User does not exist");
        }
        console.log("Found user: " + user);
        return user;
    })
    .then(function(user){
        console.log("1");
        return bcrypt.compare(password, user.password)
            .then(function(){
                console.log("2");
                return user;
            })
    })
    .then(function(user){
        var data = {
            "who": user.username,
            "where": "here"
        };
        var token = jwt.sign(data, config.jwtsecret);
        console.log("Issuing web token: " + token);
        res.json(token);
    })
    .catch(function(err){
        console.log("Error: " + err);
        return next({status: 401, message: err.message});
    });
});