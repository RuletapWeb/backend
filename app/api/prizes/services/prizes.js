const { sanitizeEntity } = require('strapi-utils');

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function makeToken(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

async function craeteReward(user, prize){
    email = prize["shop"]["email"]
    shop = await strapi.services.shop.findOne({ email });
    body = {
        "player": user,
        "shop": shop,
        "prize": prize,
        "token": makeToken(10),
    };
    return strapi.query('reward').create(body)
}

module.exports = {
    async getWinner(ctx) {
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
            await strapi.query('player').update(
                { id: user.id },
                {
                    lastPlayed: Date.now(),
                }    
            )
            reward = await craeteReward(user,winner)
            return sanitizeEntity(reward, { model: strapi.models.reward });
        } else {
            return { message: "No prizes available", code: 404};
        }
      },
};
