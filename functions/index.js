// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const users = require('./handlers/users');
const email = require('./handlers/email');

admin.initializeApp();

exports.addUser = users.addUser;
exports.getUsers = users.getUsers;
exports.sendEmailConfirmation = email.sendEmailConfirmation;
