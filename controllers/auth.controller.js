const md5 = require('md5');
const db = require("../db");
const userList = db.get("userList");

module.exports.showLogin = (req, res) => {
    res.render("auth/login");
}

module.exports.loginRequest = (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = userList.find({username: username}).value();
    if(!user) {
        res.render("auth/login", {
            errors: ["user does not exist"],
            values: req.body
        })
        return;
    }
    if(md5(password) !== user.password) {
        res.render("auth/login", {
            errors: ["wrong password!"],
            values: req.body
        })
        return;
    }
    res.cookie("cookieId", user.uid, {
        signed: true
    })
    res.redirect("/users")
}