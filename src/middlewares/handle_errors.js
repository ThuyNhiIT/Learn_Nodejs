import createError from "http-errors";

export const badRequest = (err, res) => {
  const error = createError(400, err);
  return res.status(error.status).json({
    err: 1,
    message: error.message,
  });
};

export const interalServerError = (req, res) => {
  const error = createError(500, "Internal Server Error");
  return res.status(error.status).json({
    err: 1,
    message: error.message,
  });
};

export const notFound = (req, res) => {
  const error = createError(404, "Not Found");
  return res.status(error.status).json({
    err: 1,
    message: error.message,
  });
};
