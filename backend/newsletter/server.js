const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const port = 5000;
app.use(express.json());


app.use(bodyParser.json());

const mailchimpUrl = process.env.URL_CHIMP;
const mailchimpApiKey = process.env.API;

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    await axios.post(mailchimpUrl, {
      email_address: email,
      status: 'subscribed',
    }, {
      auth: {
        username: 'anystring',
        password: mailchimpApiKey,
      },
    });

    res.send('Subscription successful!');
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send('Subscription failed.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
