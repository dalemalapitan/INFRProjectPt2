let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

/**
 * User Schema
 * 
 * This schema defines the structure of the User document in the MongoDB database.
 * 

 * @example
 * const user = new User({
 *   username: 'john_doe',
 *   displayName: 'John Doe'
 * });
 */
let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
        required:'Username is required'
    },
    /*
    password:
    {
        type:String,
        default:"",
        trim:true,
        required:'Password is required'
    }*/
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'DisplayName is required'
    },
    created:{
        type:Date,
        default: Date.now
    },
    update:{
        type:Date,
        default: Date.now
    }
},
{
    collection: "user"
}
)

// configure options for user model
let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose,options);
module.exports.User = mongoose.model('User',User);