var express = require('express');
var router = express.Router();

const { postNewUser } = require('../src/user/Infrastructure/postNewUser');
const { deleteUser } = require('../src/user/Infrastructure/deleteUserById');

router.post('/', async (req, res) => {
    const { body } = req;

    try {
        const result = await postNewUser(body);

        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteUser(id);

        if(result.error){
            res.status(400).json({ result });
        }else{
            res.status(200).json({ result });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;