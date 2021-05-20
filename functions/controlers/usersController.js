var express = require('express');
var router = express.Router();

const {
    getAllUsers
} = require('../src/user/infrastructure/getAllUsers');
const {
    postNewUser
} = require('../src/user/infrastructure/postNewUser');
const {
    deleteUser
} = require('../src/user/infrastructure/deleteUserById');
const {
    isAllowToPlayAuth
} = require('../utils/authAllowToPlay');


/* -------------------------------------------------------------------------- */
/*                         ENDPOINT: list all users                           */
/* -------------------------------------------------------------------------- */

router.get('/', async (req, res) => {

    // TODO: make a good response !!!!!
    // TODO: define Auth method

    const {
        token
    } = req.headers;

    if (token === "1234") {
        const result = await getAllUsers();

        return res.status(200).json({
            result
        });
    }

    res.status(403).json({
        forbidden: "Invalid token."
    });

});
/* -------------------------------------------------------------------------- */
/*                         ENDPOINT: create a new user                        */
/* -------------------------------------------------------------------------- */

router.post('/', async (req, res) => {
    const {
        body
    } = req;


    const result = await postNewUser(body);

    // * by default expects good request
    res.status(200);

    if (result.error) {
        res.status(400)
    }

    if (result.server) {
        res.status(500)
    }

    res.json({
        result
    });


});

/* -------------------------------------------------------------------------- */
/*               ENDPOINT: do something if user is allow to play              */
/* -------------------------------------------------------------------------- */

router.get('/:id', isAllowToPlayAuth, async (req, res) => {

    //    TODO: structure this request

    res.send("todo ok")
})

/* -------------------------------------------------------------------------- */
/*                  ENDPOINT: delete one specific user by ID                  */
/* -------------------------------------------------------------------------- */

router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const result = await deleteUser(id);

        if (result.error) {
            res.status(400)
        } else {
            res.status(200)
        }

        res.json({
            result
        });

    } catch (error) {
        res.status(500).json({
            error
        });
    }
})

module.exports = router;