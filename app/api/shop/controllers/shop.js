
async function login(ctx){
    if(ctx.request.body.email && ctx.request.body.password){
        return await strapi.services.shop.login(ctx);
    } else {
        ctx.send({
            message: 'Missing EMAIL/PASSWORD'
        }, 400);
    }
}
module.exports = {
    login
};
