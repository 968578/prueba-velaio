const express = require("express")
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const taskController = require("./task-controller.js");
const app = express();


app.use(express.json({limit: "5mb"}));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/task", taskController);


const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Escuhando en el puerto", port);
});
