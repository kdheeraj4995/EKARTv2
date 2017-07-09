var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});
mongoose.model('UserModel',userSchema);
