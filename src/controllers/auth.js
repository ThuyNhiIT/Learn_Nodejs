import * as services from "../services";

export const register = async (req, res) => {
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
    const response = await services.register(email, password); // gọi hàm register từ services
    return res.status(200).json(response); // trả data về cho client
  } catch (error) {
    return res.status(500).json({
      err: -1,
      message: "Internal server error",
    });
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
    return res.status(500).json({
      err: -1,
      message: "Internal server error",
    });
  }
};
