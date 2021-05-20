const {
    midlewareIsAllowedToPlay
} = require('../src/user/infrastructure/isAllowedToPlay');

const isAllowToPlayAuth = async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        const result = await midlewareIsAllowedToPlay(id);

        if (result) {
            return next();
        }

        return res.status(403).json({
            error: "Tiempo desde última jugada menor al necesario."
        });

    } catch (error) {
        res.status(500).json({
            error
        });
    }


};

module.exports = {
    isAllowToPlayAuth
}