const playerRegistration = async (ctx) => {
  let {email, phone} = ctx.request.body;
  if(strapi.services.email.validateEmail(email) && strapi.services.player.validatePhone(phone)){
    let user = await strapi.services.player.userLookup(ctx);
    let response;

    if (strapi.services.player.validateLastplayed(user)) {
      response = await strapi.services.prizes.getWinner(user.email);
    } else {
      response = await strapi.services.reward.LastByUser(user.email);
    }

    return response;
  } else {
    ctx.send({
      message: 'Invalid Email/Phone'
    }, 400); 
  }
};

module.exports = {
  playerRegistration
};
