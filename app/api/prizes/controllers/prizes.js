

module.exports = {
    
    async getWinner(ctx) {

      return await strapi.services.prizes.getWinner(ctx.request.body.email);
    }
};
