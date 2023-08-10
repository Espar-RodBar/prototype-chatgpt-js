const http = require("http");
const fs = require("fs");
const Express = require("express");
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.Personal,
    apiKey: process.env.APIKEY,
});

const openai = new OpenAIApi(configuration);

async function connect() {
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content:
                    "Hello, you are a frontend developer, what kind of tecnology can you use for web development?",
            },
        ],
    });
    console.log(chatCompletion.data.choices[0].message);
}

connect();

const app = new Express();

const indexfile = fs.readFileSync(__dirname + "/public/index.html");

app.get("/", (request, response) => response.end(indexfile));
app.post("/msg", (request, response) => {});

app.listen("8000", "localhost", () =>
    console.log(`Server runnig on port 8000`)
);
