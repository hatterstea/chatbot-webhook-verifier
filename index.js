const express = require("express");
const app = express();

const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;

app.get("/", (req, res) => {
  const { token, challenge } = req.query;

  if (!token || !challenge) {
    return res.status(400).send("Missing parameters.");
  }

  if (token !== VERIFICATION_TOKEN) {
    return res.status(401).send("Invalid token.");
  }

  res.set("Content-Type", "text/plain");
  return res.send(challenge);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Chatbot webhook verifier listening.");
});
