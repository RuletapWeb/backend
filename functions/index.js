// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// // ## ADD USER TO FIRESTORE ---
exports.addUser = functions.https.onRequest(async (req, res) => {
  
  // Grab the text parameter.
  const nombre = req.query.nombre;
  const email = req.query.email;
  const lastPlayed = Date.now();
  
  const writeResult = await admin.firestore().collection('users').add({nombre,email,lastPlayed});

  res.json({result: `User with ID: ${writeResult.id} added.`});
});

// ## EMAIL NOTIFICATION ---
const nodemailer = require('nodemailer');

// Configure the email transport using the default SMTP transport and a GMail account.
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
 
exports.sendEmailConfirmation = functions.firestore.document('/users/{uid}').onCreate((snap, context) => {

  // Grab the current value of what was written to Firestore.
  // TODO: Test if multiple users at a time break this function!
  const val = snap.data();
  functions.logger.log(val.nombre)
  functions.logger.log(val.email)

  const mailOptions = {
    from: '"RuleTAP" <RuleTAP.service@gmail.com>',
    to: val.email,
  };

  const subscribed = val.subscribedToMailingList;

  // Building Email message.
  mailOptions.subject = `Hola ${val.nombre} - Bienvenid@ a RuleTAP!`;
  mailOptions.text = 'Este es el cuerpo del email';

  try {
    mailTransport.sendMail(mailOptions);
    functions.logger.log(
      'New subscription confirmation email sent to:',
      val.email
    );
  } catch(error) {
    functions.logger.error(
      'There was an error while sending the email:',
      error
    );
  }
  return null;
});