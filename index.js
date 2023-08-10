require("dotenv").config();
require("./models/User.model");
const cors = require("cors");
const userRoutes = require("./Routes/User.routes");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI + "proyecto-5");

const express = require("express");
const app = express();

const port = process.env.PORT;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", userRoutes);


app.listen(port, () => {
  console.log(`servidor escuchando en puerto ${port}`);
});
