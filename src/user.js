/*
    All the date in single collection of a database
    is represented by User Model

    User Schema defines structure for User Model in Database

*/
const mongoose = require('mongoose');// importing mongoose  
const Schema = mongoose.Schema; //Creates Schema for our user model

const UserSchema = new Schema({
    name:String, //Base String class inside Javascript
    postCount:Number
});

const User = mongoose.model('user',UserSchema);
                            //^--> What collection is called inside MongoDB
                            // if it does not exists mongodb creates 
      //^--> is called User class or User model 

module.exports = User;