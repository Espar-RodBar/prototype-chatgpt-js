const fs = require("fs");
const Express = require("express");
const cors = require("cors");
require("dotenv").config();

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
app.use(cors());
app.use(Express.static("public"));

app.get("/", (request, response) =>
    response.end(fs.readFileSync(__dirname + "/public/index.html"))
);
app.post("/askBot", async (request, response) => {
    const question = request.body.message;
    try {
        const chatResponse = await completion(question);
        const message = chatResponse[0]["message"];
        response.status(200).json(message);
    } catch (error) {
        response.status(400).json({ error: "Error getting completion" });
    }
});

app.listen("8000", "localhost", () =>
    console.log(`Server runnig on port 8000`)
);
