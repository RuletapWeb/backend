const {
    db
} = require('../../../utils/firestore');

const { createReward } = require('../application/rewardFeatures');
const { findRandomPromo } = require('../../promos/infrastructure/findRandomPromo')

const postNewReward = async (user) => {

    //find random promo in DB

    const promo = await findRandomPromo();

    const newReward = await createReward(user, promo);
   
    const result = await db.collection("rewards")
        .add(newReward);

    return result;
   
};

module.exports = {
    postNewReward
}