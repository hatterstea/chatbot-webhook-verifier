const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const secretToken = 'secretvalue';

app.use(bodyParser.json());

// GET request for webhook verification
app.get('/', (req, res) => {
  const { token, challenge } = req.query;

  if (token !== secretToken || !challenge) {
    return res.status(401).send('Unauthorized');
  }

  return res.send(challenge); // Echo back the challenge string
});

// POST request for real chat events
app.post('/', (req, res) => {
  console.log('Incoming webhook:', req.body);

  const response = {
    attributes: {
      name: 'Ally',
      mood: 'curious'
    },
    responses: [
      {
        type: 'text',
        message: 'Message received successfully. :)'
      }
    ]
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Webhook server listening at http://localhost:${port}`);
});
