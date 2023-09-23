# Prototype of Chat IA in JS

This webapp let you ask to ChatGpt3.5 all that you want.

**Link to project:** https://prototype-chatgpt-js.onrender.com/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node, Mongodb, Express, Passport, OpenAi,

With the ascending of all the chatbots (chatGpt, Bing, Bard and so on..) it is a good time to build an app about this topic. You can ask him all you want, from tutorials, planning travels, about food... Your imagination is your limit!

## Optimizations

I implemented a login/logout and session in the app, but needs to be improved, updated and refactored to work in the more recent updates.

## Instalation:

Clone the repository and install all the packages.
'npm install'
'node server.js'

## Lessons Learned:

In this project I have put the MVC architecture into practice, separating functionality for better maintenance and functionality,
as well as the REST apis.

The project is implemented in NodeJs, with Express to connect to a database (MongoDb) and Mongoose schemas for saving users, using the Passport-local library.

I use the openAi API to make queries with the chatbots. It is limited to a few tokens, just enough to check the functionality of the app.

Finally, I use the library for the views -ejs-, due to its simplicity of use (it is like html and javascript)
