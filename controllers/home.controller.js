
const db = require("../db");

module.exports = (req, res) => {   
    res.render("index", {
        name: "hoang",
    });
}