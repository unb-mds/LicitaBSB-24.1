const nodemailer = require("nodemailer");
const axios = require("axios");
require('dotenv').config();

// Mailchimp API configuration
const mailchimpUrl = process.env.URL_CHIMP;
const API = process.env.API;
const email = process.env.GMAIL_USER;
const password = process.env.GMAIL_PASS;

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: email,
    pass: password,
  },
});

const getSubscribers = async () => {
  try {
    const response = await axios.get(mailchimpUrl, {
      auth: {
        username: 'anystring',
        password: API,
      },
    });
    const subscribers = response.data.members
      .filter(member => member.status === 'subscribed')
      .map(member => member.email_address);
    return subscribers;
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }
};

const sendMail = async (emailAddress) => {
  const mailOptions = {
    from: {
      name: "Nate",
      address: email,
    },
    to: emailAddress,
    subject: "Testando",
    text: "Testando #01",
    html: "<b>Oi</b>",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${emailAddress}!`);
  } catch (error) {
    console.error(`Error sending email to ${emailAddress}:`, error);
  }
};

const main = async () => {
  const subscribers = await getSubscribers();
  if (subscribers.length === 0) {
    console.log('No subscribers to send emails to.');
    return;
  }

  for (const subscriber of subscribers) {
    await sendMail(subscriber);
  }
};

main();
