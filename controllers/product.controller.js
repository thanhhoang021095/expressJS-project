const db = require("../db");
const productList = db.get("products");

module.exports.getProducts = (req,res) => {
    const page = req.query.page || 1;
    const prevPage = parseInt(page) - 1;
    const nextPage = parseInt(page) + 1
    // const currentPage = req.body
    const proQuantity = 8;
    const start = (page - 1)*proQuantity;
    const end = page*proQuantity
    res.render("products/index", {
        page: page,
        prevPage: prevPage,
        nextPage: nextPage,
        productList: productList.value().slice(start,end)
    })
}