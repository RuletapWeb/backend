const { Reward } = require('../domain/Reward');


function createReward(userId, promo ) {
    const { brandId, description } = promo;

    const reward = new Reward(userId,brandId,"18/8","25/5",description);

    console.log({
        ...reward
    });
    return {
        ...reward
    };
}

function deleteRewardById(){

}


module.exports = {
    createReward,
    deleteRewardById
}