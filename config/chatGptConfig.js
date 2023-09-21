const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  organization: process.env.Personal_CHATGPT,
  apiKey: process.env.APIKEY_CHATGPT,
})

const openai = new OpenAIApi(configuration)

console.log(
  'configChatgpt importing environtment keys: ',
  process.env.APIKEY_CHATGPT
)

module.exports = openai
