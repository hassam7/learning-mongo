const mongoose = require('mongoose'); // importing mongoose  
const Schema = mongoose.Schema; //Creates Schema for our user model

const PostSchema = new Schema({
    title:String
});

module.exports = PostSchema;