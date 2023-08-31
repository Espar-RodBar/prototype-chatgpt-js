// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/.env", debug: true });
require("dotenv").config({
    path: __dirname + "/config.env",
    debug: true,
});

const app = require("./app");
const openai = require("./config/chatGptConfig");

const connectDB = require("./models/db");

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
