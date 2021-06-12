const { sanitizeEntity } = require('strapi-utils');

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = {
    async getWinner(ctx) {
        let entities;
        entities = await strapi.services.prizes.find()
        // Create array based in each prize probability
        prize_pool = []
        entities.forEach(
            function(currentValue, currentIndex, listObj) {
              console.log("Name: " + currentValue["title"]);
              console.log("Probability: " + currentValue["probability"]);
              for ( i = 0; i < currentValue["probability"]; i++){
                  prize_pool.push(currentValue);
              }
              console.log("Pool Size: " + prize_pool.length);
            });
        winner = prize_pool[getRandomArbitrary(0,prize_pool.length)]
        return sanitizeEntity(winner, { model: strapi.models.prizes });
      },
};
