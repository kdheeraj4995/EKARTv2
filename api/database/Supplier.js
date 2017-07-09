var mongoose = require('mongoose');

var supplierSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    Address : {
        plotno : {
            type : String,
            required : true
        },
        pincode : {
            type : Number,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        }, 
        country : {
            type : String,
            required : true
        }
    }
});
mongoose.model('SupplierModel',supplierSchema);