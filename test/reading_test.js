const assert = require('assert');
const User = require('../src/user');
describe("Reading users out of database", () => {
    let tom,maria,alex,zach;

    beforeEach((done) => {
        alex = new User({name:"Alex"});
        maria = new User({name:"Maria"});
        zach = new User({name:"Zach"});
        tom = new User({
            name: 'Tom'
        });

        Promise.all([alex.save(),maria.save(),zach.save(),tom.save()])
               .then(()=>{
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

    it(" can skip and limit the result set",(done)=>{
        User.find({})
        .sort({name:1}).
        skip(1).
        limit(2)
        .then((users)=>{
            assert(users.length === 2);
            assert(users[0].name === 'Maria');
            assert(users[1].name === 'Tom');
            done();
        });
    });
});