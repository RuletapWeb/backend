
module.exports = {
    async findLastByUser(ctx) {
        if(ctx.query["email"]){
            email = ctx.query["email"];
        } else {
            return { message: "Missing user email", code: 400}
        }   
        return strapi.services.reward.LastByUser(email);
      },
};
