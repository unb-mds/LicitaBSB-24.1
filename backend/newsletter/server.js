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

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ detail: 'Email is required.' });
  }

  try {
    await axios.post(mailchimpUrl, {
      email_address: email,
      status: 'subscribed',
    });

    res.send('Inscrição realizada com sucesso!');
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send('Houve um erro, tente novamente!');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
