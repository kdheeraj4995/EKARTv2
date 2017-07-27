var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel',
        required:true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
})

mongoose.model('ProductModel', productSchema);