const assert = require('assert');
const User = require('../src/user');
describe("Reading users out of database", () => {
    let tom;
    beforeEach((done) => {
        tom = new User({
            name: 'Tom'
        });
        tom.save().then(() => {
            done();
        });
    });
    it("find all users with name of tom", (done) => {
        User.find({
            name: 'Tom'
        }).then((users) => {
            assert(users[0]._id.toString() === tom._id.toString());
            done();
        })
    })
    it("should find a single user with id", (done) => {
        User.findOne({
            _id: tom._id
        }).then((user) => {
             assert(user.name==='Tom');
             done();
        });
    });
});