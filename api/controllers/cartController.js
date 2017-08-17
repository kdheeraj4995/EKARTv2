var mongoose = require('mongoose');
var cart = mongoose.model('CartModel');
var product = mongoose.model('ProductModel');

module.exports.AddtoCart = function (req, res) {
    var message= [];
    req.body.forEach(function (prod) {
        PayforProduct(prod, req, res);
    });
    res.end();
}

var PayforProduct = function (prod, req, res) {
    product
        .findById(prod._id)
        .exec(function (err, reqPro) {
            if (err) {
                console.log(err);
            }
            else if (!reqPro) {

            }
            else {
                //console.log(reqPro)
                if (reqPro.quantity >= prod.req) {
                    cart
                        .create({
                            product: reqPro._id,
                            quantity: prod.req,
                            seller: reqPro.seller,
                            cost : prod.req* reqPro.price,
                            buyer: req.userid
                        }, function (err, cartItem) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(cartItem)
                                reqPro.quantity = reqPro.quantity - prod.req;
                                reqPro
                                    .save(function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {

                                        }
                                    })
                            }
                        })
                }
            }
        })
}