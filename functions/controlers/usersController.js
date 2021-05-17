var express = require('express');
var router = express.Router();

const { postNewUser } = require('../src/user/infrastructure/postNewUser');
const { deleteUser } = require('../src/user/infrastructure/deleteUserById');
const { isAllowToPlayAuth } = require('../utils/authAllowToPlay');

/* -------------------------------------------------------------------------- */
/*                         ENDPOINT: create a new user                        */
/* -------------------------------------------------------------------------- */

router.post('/', async (req, res) => {
    const { body } = req;

    try {
        const result = await postNewUser(body);

        if(result.error){
            res.status(400)
        }else{
            res.status(200)
        }

        res.json({result});

    } catch (error) {
        res.status(500).json({
            error
        });
    }
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
    const { id } = req.params;

    try {
        const result = await deleteUser(id);

        if(result.error){
            res.status(400)
        }else{
            res.status(200)
        }

        res.json({ result });

    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;
