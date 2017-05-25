const assert = require("assert");
const User = require('../src/user');

describe("Updating records", () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save().then(() => {
            done();
        });
    });

    function assertName(operation, done) {
        operation.then(() => User.find({}) //returns all rows from database
        ).then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        })
    }

    it("instance type using set and save", (done) => {
        joe.set('name', 'Alex'); //no update is done to database
        //only instance property is changed
        //to persist changes call save on it
        //multiple properties can be updated
        //This method is best suited when you have couple
        //of properties which you want to update
        assertName(joe.save(), done);


    });
    it("Model instance can update", (done) => {

        assertName(joe.update({
            name: 'Alex'
        }), done);
    });
});