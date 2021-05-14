var express = require('express');
var router = express.Router();

const { postNewReward } = require('../src/rewards/infrastructure/postNewReward')

router.post('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await postNewReward(userId);

        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

router.get('/', async (req, res) => {
    //Get all rewards now
});


module.exports = router;