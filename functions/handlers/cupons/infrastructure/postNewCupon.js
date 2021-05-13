const {
    db
} = require('../../../utils/firestore');

const { createCupon } = require('../application/cuponsFeatures');

const postNewCupon = async (brandId, description) => {

    const newCupon = await createCupon(brandId, description);
   
    const result = await db.collection("cupons")
        .add(newCupon);

    return result;
   
};

module.exports = {
    postNewCupon
}