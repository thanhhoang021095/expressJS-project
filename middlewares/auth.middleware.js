const db = require("../db");
const userList = db.get("userList");

module.exports.requireAuth = (req, res, next) => {
    const cookieId = req.signedCookies.cookieId;
    const user = userList.find({uid: cookieId}).value();
    if(!cookieId || !user) {
        res.redirect("/login");
        return;
    }
    res.locals.user = user;
    next();
}