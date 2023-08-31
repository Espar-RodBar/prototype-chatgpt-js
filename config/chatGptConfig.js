require("dotenv").config({
    path: __dirname + "/config.env",
});

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.Personal,
    apiKey: process.env.APIKEY,
});

console.log("on GPT Config file:\n", configuration);

const openai = new OpenAIApi(configuration);

module.exports = openai;