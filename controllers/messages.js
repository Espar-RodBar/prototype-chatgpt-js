const openai = require('../config/chatGptConfig')

exports.messages = (request, response) => {
  response.render('messages.ejs')
}

exports.completion = async function (request, response) {
  const msg = request.body.message
  console.log("on POST '/': ", msg)

  try {
    const answer = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: msg,
        },
      ],
      max_tokens: 200,
    })

    const message = answer.data.choices[0].message
    console.log(message)
    response.status(200).json(message)
  } catch (err) {
    response.status(400).json({ error: 'Error getting completion' })
  }
}
