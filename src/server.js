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

async function connect(msg) {
    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "hello",
                },
            ],
        });
    } catch (err) {
        console.log(err);
    }
}

connect();

const app = new Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());
app.use(Express.static("public"));

//const indexfile = fs.readFileSync(__dirname + "/public/index.html");

app.get("/", (request, response) =>
    response.end(fs.readFileSync(__dirname + "/public/index.html"))
);
app.post("/askBot", async (request, response) => {
    const question = request.body.question;
    const chatResponse = await connect(question);
    console.log(chatResponse);
    response.status(200);
});

app.listen("8000", "localhost", () =>
    console.log(`Server runnig on port 8000`)
);
