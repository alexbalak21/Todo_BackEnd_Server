require("dotenv").config();
let cors = require("cors");
const PORT = 3000;

const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to db."));

app.use(express.json());
app.use(cors());

const router = require("./routes/router");
app.use("/", router);

app.listen(PORT, () => console.log("http://localhost:3000/"));
