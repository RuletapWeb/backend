const {
    db
} = require('../../../utils/firestore');

const { createPromo } = require('../application/promosFeatures');

const postNewPromo = async (brandId, description) => {

    const newPromo = await createPromo(brandId, description);
   
    const result = await db.collection("promos")
        .add(newPromo);

    return result;
   
};

module.exports = {
    postNewPromo
}