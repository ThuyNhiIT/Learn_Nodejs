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
        // raw: true, // Không lấy dữ liệu thừa
      });

      //Tạo token
      // const token = response[1]
      //   ? jwt.sign(
      //       {
      //         id: response[0].id,
      //         email: response[0].email,
      //         role_code: response[0].role_code,
      //       },
      //       process.env.SECRET_KEY,
      //       { expiresIn: "5d" }
      //     )
      //   : null;
      console.log(response);
      resolve({
        err: response ? 0 : 1,
        message: response ? "Login is successfully" : "error",
        response,
      });

      resolve({ err: 0, message: "register services" });
    } catch (error) {}
  });
