const db = require("../db");
const shortId = require("shortid");
const userList = db.get("userList");

module.exports.showUsers = (req, res) => {
  res.render("users/index", {
    userList: userList.value(),
  });
};

module.exports.searchUser = (req, res) => {
  const name = req.query.name;
  const matchUsers = userList.value().filter((user) => {
    return user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    userList: matchUsers,
  });
};

module.exports.createUserForm = (req, res) => {
  res.render("users/create");
};

module.exports.createUserRequest = (req, res) => {
  const uid = shortId.generate();
  req.body.uid = uid;
  userList.push(req.body).write();
  res.redirect("/users");
};

module.exports.viewUserInfo = (req, res) => {
  const uid = req.params.uid;
  const user = userList.find({ uid: uid }).value();
  res.render("users/view", {
    user: user,
  });
};
