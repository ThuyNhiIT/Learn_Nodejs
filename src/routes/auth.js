import * as controller from "../controllers";
import express from "express";

const route = require("express").Router();

// login logout dùng post
/*
// post gửi data kiểu  body, request gửi lên, data được bọc trong body,
 người ta sẽ không biết trong body có gì, body không được public trong url
*/
route.post("/register", controller.register);
route.post("/login", controller.login);
module.exports = route;
