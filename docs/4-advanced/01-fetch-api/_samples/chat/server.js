const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("static"));

const messages = [];

app.get("/messages", (request, response) => {
  response.json(messages);
});

app.post("/send", (request, response) => {
  messages.push(request.body.message);
  response.send();
});

app.listen(3000);
