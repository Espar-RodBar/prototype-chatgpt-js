const http = require("http");
const fs = require("fs");
const Express = require("express");

const app = new Express();

app.get("/", (request, response) => response.end("root /"));
app.post("/msg", (request, response) => response.end("form sent"));

app.listen("8000", "localhost", () =>
    console.log(`Server runnig on port 8000`)
);
