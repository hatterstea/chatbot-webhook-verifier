const express = require('express');
const app = express();

const token = 'secretvalue';

app.get('/', (req, res) => {
    const challenge = req.query.challenge;
    const requestToken = req.query.token;

    if (!challenge || !requestToken) {
        res.status(400).send('Missing challenge or token');
        return;
    }

    if (requestToken !== token) {
        res.status(401).send('Unauthorized');
        return;
    }

    res.set('Content-Type', 'text/plain');
    res.status(200).send(challenge);
});

// Catch-all for empty path (no trailing slash)
app.get('', (req, res) => {
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
