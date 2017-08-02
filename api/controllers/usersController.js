var mongoose = require('mongoose');
var user = mongoose.model('UserModel');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


module.exports.register = function (req, res) {
    console.log('User Registration in Progress');
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;
    if (username == undefined || username == "") {
        res
            .status(400)
            .json({ success: false, message: "Username should not be empty" })
        return;
    }
    if (password == undefined || password == "") {
        res
            .status(400)
            .json({ success: false, message: "Password should not be empty" })
        return;
    }
    if (name == undefined || name == "") {
        res
            .status(400)
            .json({ success: false, message: "Name should not be empty" })
        return;
    }
    user
        .create({
            name: name,
            username: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            role: "User"
        }, function (err, new_User) {
            if (err) {
                console.log(err);
                res
                    .status(400)
                    .json({ success: false, message: err.message })
            }

            else {
                res
                    .status(201)
                    .json({ success: true, message: "Registration Successfull" })
            }
        })
}

module.exports.login = function (req, res) {
    console.log('User Login in Progress');
    var username = req.body.username;
    var password = req.body.password;
    if (username == undefined || username == "") {
        res
            .status(400)
            .json({ success: false, message: "Username should not be empty" })
        return;
    }
    if (password == undefined || password == "") {
        res
            .status(400)
            .json({ success: false, message: "Password should not be empty" })
        return;
    }
    user
        .findOne({
            username: username
        })
        .exec(function (err, user_requested) {
            if (err) {
                res
                    .status(400)
                    .json({ success: false, message: "Bad Request" })
            }
            else if (!user_requested) {
                res
                    .status(500)
                    .json({ success: false, message: "Username does on exist on database" })
            }
            else {
                if (bcrypt.compareSync(password, user_requested.password)) {
                    var token = jwt.sign({ username: user_requested.username, role: user_requested.role }, 's3cr3t', { expiresIn: 3600 });
                    res
                        .status(200)
                        .json({ success: true, token: token, message: "Login Successfull" });
                }
                else {
                    res
                        .status(401)
                        .json({ success: false, message: "Unauthorized - Incorrect Password" })
                }
            }
        })
}

module.exports.addRole = function (req, res) {
    var username = req.body.username;
    var role = req.body.role;
    if (username == undefined || username == "") {
        res
            .status(400)
            .json({ success: false, message: "username should not be empty" })
        return;
    }
    else if (role == undefined || role == "") {
        res
            .status(400)
            .json({ success: false, message: "Role should not be empty" })
        return;
    }
    else if (['Admin', 'Supplier', 'User'].indexOf(role) == -1) {
        res
            .status(400)
            .json({ success: false, message: "Invalid Role" })
        return;
    }
    else {
        user
            .findOne({
                username: username
            }, function (err, User) {
                if (err) {
                    res
                        .status(500)
                        .json({ success: false, message: err.message })
                }
                else if (!User) {
                    res
                        .status(404)
                        .json({ success: false, message: "User not found" })
                }
                else if (User.role.indexOf(role) == -1) {
                    User.role.push(role);
                    User
                        .save(function (err, updated_USer) {
                            if (err) {
                                res
                                    .status(500)
                                    .json({ success: false, message: err.message })
                                console.log(err);
                            }
                            else {
                                res
                                    .status(201)
                                    .json({ success: true, message: "Role Added" })
                            }
                        })
                }
                else {
                    res
                        .status(200)
                        .json({ success: false, message: "User already has the required access" })
                    return
                }
            })
    }
}

module.exports.deleteRole = function (req, res) {
    var username = req.body.username;
    var role = req.body.role;
    if (username == undefined || username == "") {
        res
            .status(400)
            .json({ success: false, message: "username should not be empty" })
        return;
    }
    else if (role == undefined || role == "") {
        res
            .status(400)
            .json({ success: false, message: "Role should not be empty" })
        return;
    }
    else if (['Admin', 'Supplier', 'User'].indexOf(role) == -1) {
        res
            .status(400)
            .json({ success: false, message: "Invalid Role" })
        return;
    }
    else {
        user
            .findOne({
                username: username
            }, function (err, User) {
                if (err) {
                    res
                        .status(500)
                        .json({ success: false, message: err.message })
                }
                else if (!User) {
                    res
                        .status(404)
                        .json({ success: false, message: "User not found" })
                }
                else if (User.role.indexOf(role) != -1) {
                    User.role.splice(User.role.indexOf(role), 1);
                    User
                        .save(function (err, updated_USer) {
                            if (err) {
                                res
                                    .status(500)
                                    .json({ success: false, message: err.message })
                                console.log(err);
                            }
                            else {
                                res
                                    .status(201)
                                    .json({ success: true, message: "Role Deleted" })
                            }
                        })
                }
                else {
                    res
                        .status(200)
                        .json({ success: false, message: "User does not have the required access" })
                    return
                }
            })
    }
}

module.exports.getUsers = function (req, res) {
    var query = {};
    var select ={
        __v:false,
        password:false,
        role:false
    }
    if (req.query && req.query.role) {
        query = {
            role: { $in: [req.query.role] }
        }
    }
    user
        .find(query,select)
        .exec(function (err, Suppliers) {
            console.log(Suppliers)
            if (err) {
                res
                    .status(500)
                    .json({ success: false, message: err.message })
            }
            else if (!Suppliers) {
                res
                    .status(200)
                    .json({ success: false, message: "No Suppliers found " })
            }
            else {
                res
                    .status(201)
                    .json({ success: true, suppliers: Suppliers })
            }
        })

}