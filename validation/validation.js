module.exports.validUser = (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const errors = [];
    if(!name) {
        errors.push("Name is required");
    }
    if(!phone) {
        errors.push("Phone is required");
    }
    if(errors.length) {
        res.render("users/create", {
            errors: errors,
            values: req.body
        })
        return;
    }
    next();
}