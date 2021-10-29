require("dotenv").config();
require("./model/mongo/db");
const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const MovieController = require("./controller/Movie");
  
//
app.use(cors());

 
//-----------movies----------- 
app.get("/movies", MovieController.list);
app.get("/movies/:id", MovieController.getById);
 
// мидл веар, промежуточное по
app.use("*", (req, res) => {
  res.status(404).json({
    message: "404 Not Found",
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log({ err });
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server app listening at http://localhost:${PORT}`);
});
