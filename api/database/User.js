var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : [{
        type : String,
        required : true,
        default : 'User',
        unique : true,
        enum :['User','Admin','Supplier']
    }]
});
mongoose.model('UserModel',userSchema);
