var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description : {
        type: String,
        required: true 
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel'
    }
})

mongoose.model('ProductModel',productSchema);