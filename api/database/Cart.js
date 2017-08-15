var mongoose = require('mongoose');
var cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    },
    quantity: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required : true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    PurchasedOn: {
        type: Date,
        "default": Date.now
    }
})

mongoose.model('CartModel', cartSchema);