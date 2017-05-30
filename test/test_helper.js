const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => done())
        .on("error", (error) => console.warn("Error: ", error));

})
beforeEach((done) => {
    const {users,comments,blogposts} = mongoose.Connection.collections;
    /*is same as
        users = mongoose.Connection.collections.users
        comments = mongoose.Connection.collections.comments
        blogPosts = mongoose.Connection.collections.blogPosts
    */
    users.drop(() => {

        comments.drop(()=>{
            blogposts.drop(()=>{
                done();
            });
        })
    });
});