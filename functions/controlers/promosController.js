var express = require('express');
var router = express.Router();

const { postNewPromo } = require('../src/promos/infrastructure/postNewPromo')
const { findRandomPromo } = require('../src/promos/infrastructure/findRandomPromo')

router.post('/', async (req, res) => {
    const { brandId, description } = req.body;

    try {
        const result = await postNewPromo(brandId,description);

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
    try {
        const result = await findRandomPromo();

        res.status(200).json({
            result
        });
    } catch (error) {
        
    }
});

module.exports = router;