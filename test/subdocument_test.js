const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
    it("can create a sub document", (done) => {
        const joe = new User({
            name: "Joe",
            posts: [{
                title: 'PostTitle'
            }]
        });
        joe.save().then(() => {
            return User.findOne({
                name: 'Joe'
            });
        }).then((result) => {
            assert(joe.posts[0].title === result.posts[0].title);
            done();
        });
    });
    it("can add subdocuments to an existing record", (done) => {
        var joe = new User({name:"Joe"});
        joe.save().then(()=>{
            return User.findOne({name:"Joe"})
        }).then((user)=>{
            user.posts.push({title:"New Post"});
            return user.save();
        }).then(()=>{
            return User.findOne({name:"Joe"});
        }).then((user)=>{
            assert(user.posts[0].title === "New Post");
            done();
        });
    });
});