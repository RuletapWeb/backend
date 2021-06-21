// Returns a random integer between a min (included) and a max (excluded)
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

async function getWinner(email) {
    user = await strapi.services.player.findOne({ email });

    // Create array based in each prize probability
    let prizes;
    prizes = await strapi.services.prizes.find()
    const prize_pool = []
    prizes.forEach(   function(currentValue) {
        if(currentValue["quantityLeft"] > 0){
            for ( i = 0; i < currentValue["probability"]; i++){
                prize_pool.push(currentValue);
            }
        }
    });

    if(prize_pool.length > 0 ){
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
        reward = await strapi.services.reward.craeteReward(user,winner);

        // Sends email to player with token and prize information
        await strapi.services.email.sendEmail(reward)

        // Adding status to response
        reward.status = strapi.config.get('server.respones.playable', 'defaultValueIfUndefined');

        return reward;
    } else {
        return { message: "No prizes available", code: 404};
    }
}

module.exports = {
    getWinner
};
