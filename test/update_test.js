const assert = require("assert");
const User = require('../src/user');

describe("Updating records", () => {
    let joe;
    beforeEach((done) => {
        joe = new User({
            name: 'Joe',
            postCount: 0
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
    it('A model class can update', (done) => {
        assertName(
            User.update({
                name: "Joe"
            }, {
                name: "Alex"
            }), done);
    });
    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({
                name: "Joe"
            }, {
                name: "Alex"
            }), done);
    });
    it('A model class can find a record with an ID and update', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, {
                name: "Alex"
            }), done);
    });

    it("A user can have their post count incremented by one", (done) => {
        //Model instance can be used to update only a single document
        //Use update when you have to perform some kind of logic operation
        User.update({
            name: 'Joe'
        }, {
            $inc: {
                postCount: 1
            }
        }).then(()=>{
            User.findOne({name:"Joe"}).then((user)=>{
                assert(user.postCount === 1);
                done();
            })
        });
    });
});