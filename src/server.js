const fs = require("fs");
const Express = require("express");
const morgan = require("morgan");
const ejs = require("ejs");
const connectDB = require("./config/db");

const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.Personal,
    apiKey: process.env.APIKEY,
});

const openai = new OpenAIApi(configuration);

async function completion(msg) {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: msg,
                },
            ],
            max_tokens: 100,
        });
        return response.data.choices;
    } catch (err) {
        console.log(err);
    }
}

const app = new Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(Express.static("public"));

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));

app.post("/askBot", async (request, response) => {
    const question = request.body.message;
    try {
        const chatResponse = await completion(question);
        const message = chatResponse[0]["message"];
        response.status(200).json(message);
    } catch (error) {
        response
            .status(400)
            .json({ error: "Error getting completion" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`));
