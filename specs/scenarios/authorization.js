var register = require("../api/support/register.js");
var auth = require("../api/support/auth.js");
var users = require("../api/support/users.js");
var chai = require("chai");
chai.should();
chai.use(require("chai-things"));

describe("Authorization workflow", function(){
    it("should allow a user to register, login and get the list of all the users", itShouldAllowAUserToRegisterLoginAndGetTheListOfAllTheUsers);
    it("should NOT allow a user that is not authenticated to get the list of all the users", itShouldNotAllowAUserThatIsNotAuthenticatedToGetTheListOfAllTheUsers);
    it("should NOT allow a user with a fake JSON Web Token to get the list of all the users", itShouldNotAllowAUserWithAFakeJSONWebTokenToGetTheListOfAllTheUsers);
});

function itShouldAllowAUserToRegisterLoginAndGetTheListOfAllTheUsers(){
    var user = register.generateUser();
    var credentials = {
        username: user.username,
        password: user.password
    }
    return register.register(user)
        .then(function(response){
            return auth.auth(credentials);
        })
        .then(function(response){
            var jsonWebToken = response.body;
            return users.getUsers(jsonWebToken);
        })
        .then(function(response){
            response.status.should.equal(200);
            response.body.should.be.an("array");
        });
}

function itShouldNotAllowAUserThatIsNotAuthenticatedToGetTheListOfAllTheUsers(){
    return users.getUsers()
        .then(function(response){
            response.status.should.equal(401);
        });
}

function itShouldNotAllowAUserWithAFakeJSONWebTokenToGetTheListOfAllTheUsers(){
    return users.getUsers("fakeToken")
        .then(function(response){
            response.status.should.equal(401);
        });
}