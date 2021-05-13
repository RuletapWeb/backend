const {
    db
} = require('../../../utils/firestore');

const { randomPromo } = require('../application/promosFeatures');

const findRandomPromo = async () => {

    const promosFromDB = await db.collection("promos").get();

    const promoList = [];

    promosFromDB.forEach((doc) => {
        promoList.push({ ...doc.data() })
     })

    
    console.log(promoList);

    const oneRandomPromo = await randomPromo(promoList);
   
    return oneRandomPromo;
   
};

module.exports = {
    findRandomPromo
}