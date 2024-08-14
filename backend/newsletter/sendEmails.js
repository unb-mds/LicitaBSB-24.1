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

console.log('Nodemailer transporter created.');

const getSubscribers = async () => {
  console.log('Fetching subscribers from Mailchimp...');
  try {
    const response = await axios.get(mailchimpUrl, {
      auth: {
        username: 'anystring',
        password: API,
      },
    });
    console.log('Successfully fetched subscribers.');
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
  console.log(`Sending email to: ${emailAddress}`);
  const mailOptions = {
    from: {
      name: "LicitaBSB",
      address: email,
    },
    to: emailAddress,
    subject: "Atualizações Semanais de Licitações - Licita BSB",
    text: `Olá,

Gostaríamos de informar que as licitações mais recentes em Brasília foram atualizadas em nosso portal Licita BSB. Através do nosso site, você pode acessar essas informações de maneira fácil e compreensível.

Além disso, lembramos que também estamos compartilhando essas atualizações na rede social X (antigo Twitter) através do nosso perfil: https://x.com/licitabsb. Isso nos permite alcançar um público ainda maior e manter a população de Brasília informada sobre as decisões governamentais.

Atenciosamente,
Equipe Licita BSB`,
    html: `<p>Olá,</p>
           <p>Gostaríamos de informar que as licitações mais recentes em Brasília foram atualizadas em nosso portal <strong>Licita BSB</strong>. Através do nosso site, você pode acessar essas informações de maneira fácil e compreensível.</p>
           <p>Além disso, lembramos que também estamos compartilhando essas atualizações na rede social X (antigo Twitter) através do nosso perfil: <a href="https://x.com/licitabsb" target="_blank">https://x.com/licitabsb</a>. Isso nos permite alcançar um público ainda maior e manter a população de Brasília informada sobre as decisões governamentais.</p>
           <p>Atenciosamente,<br>Equipe Licita BSB</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to: ${emailAddress}`);
  } catch (error) {
    console.error(`Failed to send email to: ${emailAddress}. Error: ${error.message}`);
  }
};

const main = async () => {
  console.log('Starting main workflow...');
  const subscribers = await getSubscribers();
  if (subscribers.length === 0) {
    console.log('No subscribers to send emails to.');
    return;
  }

  for (const subscriber of subscribers) {
    try {
      await sendMail(subscriber);
    } catch (error) {
      console.error(`Error processing email: ${subscriber}. Continuing with the next one.`);
    }
  }

  console.log('All emails attempted.');
};

main();
