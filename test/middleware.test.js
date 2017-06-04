const mongoose = require("mongoose");
const assert = require("assert");
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe("Middleware",()=>{
    let joe,blogPost;
     beforeEach((done) => {
        joe = new User({
            name: "Joe"
        });
        blogPost = new BlogPost({
            title: "JS is fun",
            content: "Yes!! it really is"
        });
      
        joe.blogPost.push(blogPost); //one to many 1 user has many posts

        Promise.all([joe.save(), blogPost.save()])
            .then(() => {
                done();
            })
    });
    it("users clean up dangling blogPost on remove",(done)=>{
        joe.remove()
        .then(()=>{
            return BlogPost.count();
        })
        .then((count)=>{
            assert(count===0);
            done();
        });
    });
});