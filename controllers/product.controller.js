const db = require("../db");
const productList = db.get("products");

module.exports.getProducts = (req,res) => {

    // show Cart Item
    const sessionId = req.signedCookies.sessionId;
    const cartItem = db.get("sessions")
        .find({ id: sessionId })
        .get("cart")
        .value()
    var sumCart = 0;    
    for (let key in cartItem) {
        sumCart += cartItem[key]
    }
    res.locals.sumCart = sumCart;

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

module.exports.searchProduct = (req, res) => {
    const name = req.query.name;
    const matchedProduct = productList.value().filter(product => {
        return product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    })
    res.render("products/index", {
        productList: matchedProduct
    })
}