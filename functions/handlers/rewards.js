const {
    db
} = require('../utils/firestore');

const getReward = async (req, res) => {
    // reward logic
    res.status(200).json({
        msg: "Premio obtenido"
    });
};

const createReward = async (req, res) => {
    // reward logic
    res.status(200).json({
        msg: "Premio creado"
    });
};

module.exports = {
    getReward,
    createReward
};