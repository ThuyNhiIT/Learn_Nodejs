import * as services from "../services";
import { interalServerError } from "../middlewares/handle_errors";
import { email, password } from "../helper/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
  try {
    const error = joi.object({ email, password }).validate(req.body);
    console.log(error);

    const { email, password } = req.body; // lấy email và password từ req.body
    // console.log({ email, password });
    // Nếu ko gửi email hoặc password thì trả về lỗi, tránh chạy nhiều, phản hồi nhanh
    if (!email || !password) {
      return res.status(400).json({
        // lỗi request
        err: 1,
        message: "Missing required fields",
      });
    }
    // console.log(response);
    const response = await services.register(email, password); // gọi hàm register từ services
    return res.status(200).json(response); // trả data về cho client
  } catch (error) {
    // return res.status(500).json({
    //   err: -1,
    //   message: "Internal server error",
    // });
    return interalServerError(req, res);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // lấy email và password từ req.body
    // console.log({ email, password });
    // Nếu ko gửi email hoặc password thì trả về lỗi, tránh chạy nhiều, phản hồi nhanh
    if (!email || !password) {
      return res.status(400).json({
        // lỗi request
        err: 1,
        message: "Missing required fields",
      });
    }
    // console.log(response);
    const response = await services.login(email, password); // gọi hàm register từ services
    return res.status(200).json(response); // trả data về cho client
  } catch (error) {
    // return res.status(500).json({
    //   err: -1,
    //   message: "Internal server error",
    // });
    return interalServerError(req, res);
  }
};
