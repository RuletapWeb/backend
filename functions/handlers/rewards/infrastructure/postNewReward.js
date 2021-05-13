const {
    db
} = require('../../../utils/firestore');

const { createReward } = require('../application/rewardFeatures');
const { findRandomCupon } = require('../../cupons/infrastructure/findRandomCupon')

const postNewReward = async (user) => {

    //find random cupon in DB

    const cupon = await findRandomCupon();

    const newReward = await createReward(user, cupon);
   
    const result = await db.collection("rewards")
        .add(newReward);

    return result;
   
};

module.exports = {
    postNewReward
}