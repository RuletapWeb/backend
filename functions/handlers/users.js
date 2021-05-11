// empezando a modularizar

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');
// const { user } = require('firebase-functions/lib/providers/auth');
const {
    db
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
    // const userList = await db.collection('users').get();

    // userList.forEach(doc => {
    //     functions.logger.log(doc);
    // })
    // return "todo OK";
    res.status(200).json({
        msg: "Listado de usuarios."
    });
};

const addUser = async (req, res) => {
    const payload = req.body;
    const id = req.body.alias

    try {
        const result = await db.collection("users")
            .doc(id)
            .set(payload);

        res.status(200).json({
            result
        });

    } catch (error) {
        res.status(500).json({error});
    }
};

const findUserById = async (req, res) => {
    const id = req.params.id;
 
    try {
        const user =  await db.collection('users')
        .where('alias', '==', id)
        .get();

        res.status(200).json({
            user
        })
        
    } catch (error) {
        res.status(500).json({error});
    }

}

module.exports = {
    getUsers,
    addUser,
    findUserById
};