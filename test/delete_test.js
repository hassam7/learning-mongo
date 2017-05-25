const assert = require('assert');
const User = require('../src/user');

describe("Deleting a User", () => {
    //User can be delete via remove method called on Model Class or Model Instance
    //By calling remove on model instance the mongoose will remove corresponding
    //record accoring to the model instance

    //Model will remove according to criteria provided to it.
    let tom;
    beforeEach((done) => {
        joe = new User({
            name: "Tom"
        });
        joe.save().then(() => {
            done();
        })
    });
    it("model instance remove", (done) => {
        joe.remove().then(() => {
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
            User.findOne({name:'Tom'}).then((result)=>{
                assert(result===null);
                done();
            })
        });

    });
    it("class method findAndRemove", () => {

    });
    it("class method findByIdAndRemove", () => {

    });
});