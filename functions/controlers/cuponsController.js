var express = require('express');
var router = express.Router();

const { postNewCupon } = require('../handlers/cupons/infrastructure/postNewCupon')
const { findRandomCupon } = require('../handlers/cupons/infrastructure/findRandomCupon')

router.post('/', async (req, res) => {
    const { brandId, description } = req.body;

    try {
        const result = await postNewCupon(brandId,description);

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
        const result = await findRandomCupon();

        res.status(200).json({
            result
        });
    } catch (error) {
        
    }
});

module.exports = router;