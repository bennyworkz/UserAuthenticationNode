// const { types, string } = require("joi");
// const { string } = require("joi");
const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

});


module.exports= mongoose.model('User', userModel);