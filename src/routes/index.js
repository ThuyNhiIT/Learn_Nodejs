import user from "./user";
import auth from "./auth";
import { interalServerError } from "../middlewares/handle_errors";
import { notFound } from "../middlewares/handle_errors";
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);

  // return app.use("/", (req, res) => {
  //   return res.send("SERVER ON");
  // });

  return app.use("*", (req, res) => {
    return notFound(req, res);
  });
};

module.exports = initRoutes;
