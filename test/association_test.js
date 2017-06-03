const mongoose = require('mongoose');
const assert = require("assert");
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const Schema = mongoose.Schema;

describe("Associations", () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({
            name: "Joe"
        });
        blogPost = new BlogPost({
            title: "JS is fun",
            content: "Yes!! it really is"
        });
        comment = new Comment({
            content: "Thanks for the great post!!!"
        });
        joe.blogPost.push(blogPost); //one to many 1 user has many posts
        blogPost.comments.push(comment); //one to many 1 blog post has many comments
        comment.user = joe; //one to one 1 comment has one user

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => {
                done();
            })
    });

    it("saves a relation between user and a blogpost", (done) => {
        User.findOne({
            name: "Joe"
        }).populate("blogPost").then((user) => {
            assert(user.blogPost[0].title === "JS is fun");
            done();
        });
    });
    it("saves a full relation tree", (done) => {
        User.findOne({name:"Joe"})
        .populate({
            path:"blogPost",
            populate:{
                path:'comments',
                model:'comment',
                populate:{
                    path:'user',
                    model:'user'
                }
            }
        }).then((user)=>{
            assert(user.name === "Joe");
            assert(user.blogPost[0].title === "JS is fun");
            assert(user.blogPost[0].comments[0].content === "Thanks for the great post!!!");
            assert(user.blogPost[0].comments[0].user.name === "Joe");
            
            
            done();
        });
    });
}); 