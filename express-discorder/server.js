require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`));

app.post("/ibm", (req, res) => {
  // const content = "hey "+req.body.sender.login+" welcome to "+req.body.repository.name+" :egg:";
  // const avatarUrl = req.body.sender.avatar_url;
  //const content = ":wave: Hi mom!";
  const content = req.body.payload.input.text;
  //const avatarUrl = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: "usuario: \n"+content,
      /*embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],*/
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.post("/watson", (req, res) => {
  // const content = "hey "+req.body.sender.login+" welcome to "+req.body.repository.name+" :egg:";
  // const avatarUrl = req.body.sender.avatar_url;
  // const content = ":wave: Hi mom!";
  const content = req.body.payload.output.generic[0].text;
  //const avatarUrl = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
  axios
    .post(process.env.DISCORD_WEBHOOK_URL, {
      content: "bot: \n"+content,
      /*embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],*/
    })
    .then((discordResponse) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
