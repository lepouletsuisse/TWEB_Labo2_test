var Chance = require("chance");
var chance = new Chance();
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("The /users endpoint", function(){
    it("should allow an authanticated user to get a list of users");
    it("should refuse to return a list of users to a user who is not authenticated");
});