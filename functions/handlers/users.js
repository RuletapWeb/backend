// empezando a modularizar

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const { user } = require('firebase-functions/lib/providers/auth');
const {
    db,
  } = require('../utils/firestore');

// // // ## ADD USER TO FIRESTORE ---
// exports.addUser = functions.https.onRequest(async (req, res) => {
  
//   // Grab the text parameter.
//   const nombre = req.query.nombre;
//   const email = req.query.email;
//   const lastPlayed = Date.now();
  
//   const writeResult = await db.collection('users').add({nombre,email,lastPlayed});

//   res.json({result: `User with ID: ${writeResult.id} added.`});
// });

// exports.getUsers = functions.https.onRequest(async (req, res) => {
//     const userList = await db.collection('users').get();

//     functions.logger.log(userList);
//     return userList;
// })

const getUsers = async (req, res) => {
    const userList = await db.collection('users').get();

    userList.forEach(doc => {
        functions.logger.log(doc);
    })
    return "todo OK";
}

module.exports = getUsers;