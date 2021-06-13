'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findByUser(ctx) {
        if(ctx.query["email"]){
            email = ctx.query["email"];
            user = await strapi.services.player.findOne({ email });
        } else {
            return { message: "Missing user email", code: 400}
        }
        let entities;
        entities = await strapi.services.prizes.find()
        // Create array based in each prize probability
        prize_pool = []
        entities.forEach(
            function(currentValue, currentIndex, listObj) {
                if(currentValue["quantityLeft"] > 0){
                    for ( i = 0; i < currentValue["probability"]; i++){
                            prize_pool.push(currentValue);
                    }
                }
            });
        if(prize_pool.length > 1 ){
            winner = prize_pool[getRandomArbitrary(0,prize_pool.length)];
            await strapi.query('prizes').update(
                { id: winner["id"]},
                {
                    quantityLeft: (winner["quantityLeft"] -1 ),
                }    
            )
            reward = await craeteReward(user,winner)
            return sanitizeEntity(reward, { model: strapi.models.reward });
        } else {
            return { message: "No prizes available", code: 404};
        }
      },
};
