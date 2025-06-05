const express = require('express');
const app = express();

const YOUR_SECRET_TOKEN = 'secretvalue'; // the only creative choice that matters right now

app.get('/', (req, res) => {
  const { challenge, token } = req.query;

  if (!challenge || !token) {
    return res.status(400).send('Missing challenge or token');
  }

  if (token !== YOUR_SECRET_TOKEN) {
    return res.status(401).send('Invalid token');
  }

  res.set('Content-Type', 'text/plain');
  res.send(challenge);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook verifier listening on port ${port}`);
});
