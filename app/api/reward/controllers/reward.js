
module.exports = {
    async findLastByUser(ctx) {
        if(ctx.query["email"]){
            email = ctx.query["email"];
        } else {
            return { message: "Missing user email", code: 400}
        }   
        return strapi.services.reward.LastByUser(email);
      },
      async findByShop(ctx) {
        if(ctx.request.body.email){
            rewardsbyShop = await strapi.services.reward.rewardByShop(ctx.request.body.email);
            console.log(rewardsbyShop)
            if(rewardsbyShop != null){
                return rewardsbyShop;
            } else {
                ctx.send({
                    message: 'Rewards not found'
                }, 404);
            }
        } else {
            ctx.send({
                message: 'Email is missing'
            }, 400);
        }   
      }
};
