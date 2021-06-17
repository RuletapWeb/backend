/* -------------------------------------------------------------------------- */
/*      Custom handler to retrieve the ammount of reward, by Shop email,      */
/*                    that HAVE and HAVE NOT been redeemed.                   */
/* -------------------------------------------------------------------------- */

async function findByShop(ctx) {
    if(ctx.request.body.email){
        rewardsbyShop = await strapi.services.reward.rewardByShop(ctx.request.body.email);
        console.log(rewardsbyShop)
        if(rewardsbyShop != null){
            return rewardsbyShop;
        } else {
            ctx.send({
                message: 'Rewards/Email not found'
            }, 404);
        }
    } else {
        ctx.send({
            message: 'Email is missing'
        }, 400);
    }   
  }


module.exports = {
    findByShop
};
