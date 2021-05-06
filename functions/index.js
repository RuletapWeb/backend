const functions = require('firebase-functions');
const users = require('./handlers/users');
// const email = require('./handlers/email');

module.exports = {
  'getUsers' : functions.https.onRequest(users)
}