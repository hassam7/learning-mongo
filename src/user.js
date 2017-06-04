/*
    All the date in single collection of a database
    is represented by User Model

    User Schema defines structure for User Model in Database

*/
const mongoose = require('mongoose'); // importing mongoose  
const Schema = mongoose.Schema; //Creates Schema for our user model
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => {
                return name.length > 2;
            },
            message: "Name must be longer than 2 characters"
        },
        required: [true, "Name is required."]
    }, //Base String class inside Javascript
    posts: [PostSchema], //Sub documents
    likes: Number,
    blogPost: [{        //association example
        type: Schema.Types.ObjectId,
        ref: "blogPost"
    }]
});
//Using function instead of fat arrow so 'this' has right context
UserSchema.virtual("postCount").get(function () {
    return this.posts.length; //refers to current instance of Model
}); //a Virtual field named postCount
UserSchema.pre("remove",function(next){
    //this === refers to current instance of user
    //if we used fat arrow function the context of this will be that of parent
    
    /*
        To remove blogPost we can require blogPost and then call remove method on it.
        But it can cause cyclic dependencies. So it's better to use mongoose.
    */
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove( { id : { $in : this.blogPost } } )
     .then(()=>next());
    //go through all the blogPost and remove if the id field matches the id field of
    //this.blogPost
});

const User = mongoose.model('user', UserSchema);
//^--> What collection is called inside MongoDB
// if it does not exists mongodb creates 
//^--> is called User class or User model 

module.exports = User;