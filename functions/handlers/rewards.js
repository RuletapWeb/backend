const {
    db
} = require('../utils/firestore');

const { creationAndExpiration } = require('../utils/dateValidation');

const getReward = async (req, res) => {
    // reward logic
    res.status(200).json({
        msg: "Premio obtenido"
    });
};

const createReward = async (req, res) => {
    // reward logic

    // TODO: obtener jugada random

    //DONE: function returns an Object of valid dates
    // TODO: check remote configurable!!
    let validCupon = creationAndExpiration(7);

    let payload = {
        userId : "354", //obtener del body
        createdAt : validCupon.created, //fecha creacion
        expiresAt : validCupon.expires, //definir vencimiento
        name : "Docena de empanadas", //obtener Random!
        brandId : "984", //obtener Random!
    }

    try {
        // setting reward in DB
        const result = await db.collection("rewards")
            .doc()
            .set(payload);

        res.status(200).json({
            result
        });

    } catch (error) {
        res.status(500).json({error});
    }

};

module.exports = {
    getReward,
    createReward
};