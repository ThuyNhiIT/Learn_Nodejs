import express from "express";
import cors from "cors";
require("dotenv").config();
import initRoutes from "./src/routes";
require("./connectionDatabase");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: {
      GET: true,
      POST: true,
      PUT: true,
      DELETE: true,
    },
  })
);

//CRUD
// app.get("/api", (req, res) => {
//   res.json({
//     data: "Hello from API",
//   });
// });
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res) => {
//   return res.send("SERVER IS RUNNING");
// });

initRoutes(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
});
