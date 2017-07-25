var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    description : {
        type : String
    }
   
});
mongoose.model('CategoryModel',categorySchema);