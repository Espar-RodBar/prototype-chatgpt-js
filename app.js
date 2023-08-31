const Express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const cors = require("cors");

const app = new Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// static folder
app.use(Express.static("public"));

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/chatGptRoute"));

module.exports = app;
