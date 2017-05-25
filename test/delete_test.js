const assert = require('assert');
const User = require('../src/user');

describe("Deleting a User", () => {
    //User can be delete via remove method called on Model Class or Model Instance
    //By calling remove on model instance the mongoose will remove corresponding
    //record accoring to the model instance

    //Model will remove according to criteria provided to it.
    let tom;
    beforeEach((done) => {
        tom = new User({
            name: "Tom"
        });
        tom.save().then(() => {
            done();
        })
    });
    it("model instance remove", (done) => {
        tom.remove().then(() => {
            return User.findOne({
                name: 'Tom'
            });
        }).then((result) => {
            assert(result === null);
            done();
        });
    });
    it("class method remove", (done) => {
        User.remove({
            name: 'Tom'
        }).then(() => {
            User.findOne({
                name: 'Tom'
            }).then((result) => {
                assert(result === null);
                done();
            })
        });

    });
    it("class method findAndRemove", (done) => {
        User.findOneAndRemove({
            name: 'Tom'
        }).then(() => {
            User.findOne({
                name: 'Tom'
            }).then((result) => {
                assert(result === null);
                done();
            })
        });
    });
    it("class method findByIdAndRemove", (done) => {
        User.findByIdAndRemove(tom._id).then(() => {
            User.findOne({
                name: 'Tom'
            }).then((result) => {
                assert(result === null);
                done();
            })
        });
    });
});