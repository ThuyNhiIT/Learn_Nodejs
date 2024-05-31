const user = require("../controllers/user");
const route = require("express").Router();

route.get("/", user.getUser);
module.exports = route;
