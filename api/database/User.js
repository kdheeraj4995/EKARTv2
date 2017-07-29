var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
    },
    username : {
        type : String,
        unique : true,
        lowercase:true,
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
        enum :['User','Admin','Supplier']
    }]
});

mongoose.model('UserModel',userSchema);
