import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { raw } from "mysql2";

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8)); // coi trên web, tạo muối

export const register = async (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      // Tìm có thì trả về, không có thì tạo mới
      const response = await db.User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password: hashPassword(password),
        },
      });

      console.log(response[0].email);

      //Tạo token
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
          )
        : null;
      // console.log(response);
      resolve({
        err: response[1] ? 0 : 1,
        message: response[1] ? "User created" : "email already exists",
        token: token,
      });

      resolve({ err: 0, message: "register services" });
    } catch (error) {}
  });

export const login = async (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      // Tìm có thì trả về, không có thì tạo mới
      const response = await db.User.findOne({
        where: { email },
        raw: true, // Không lấy dữ liệu thừa
      });

      // So sánh password
      const isChecked =
        response && bcrypt.compareSync(password, response.password); // Nếu có thì so sánh password
      // Nếu password đúng thì tạo token
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.SECRET_KEY,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: token ? 0 : 1,
        message: token
          ? "Login is successfully"
          : response
          ? "Password is incorrect"
          : "Email is not exists",
        "access-token": token ? `Bearer ${token}` : null,
      });

      resolve({ err: 0, message: "register services" });
    } catch (error) {}
  });
