/* ---------------------------- busqueda del user --------------------------- */
async function userLookup(email) {
  //todo: validar igual email y telefono
  let myUser = await strapi.services.player.findOne({
    email
  });

  if (!myUser) {
    let newUser = {
      name: ctx.request.body.email.split('@')[0],
      phone: ctx.request.body.phone,
      email: ctx.request.body.email
    };
    myUser = await strapi.services.player.create(newUser);
  }

  return myUser;
}

/* ---------------------- chequear si puede o no jugar ---------------------- */
function validateLastplayed(user) {
       
  let todayWeekAgo = new Date();
  todayWeekAgo.setDate(todayWeekAgo.getDate() - 7);
  todayWeekAgo = Date.parse(todayWeekAgo);
  let userDate = Date.parse(user.lastPlayed);

  return userDate < todayWeekAgo;
}

const playerRegistration = async (ctx) => {

  const email = ctx.request.body.email;

  let user = await userLookup(email);
  let response;

  if (validateLastplayed(user)) {
    response = await strapi.services.prizes.getWinner(user.email);
  } else {
    response = await strapi.services.reward.LastByUser(user.email);
  }

  return response;
};

module.exports = {
  playerRegistration
};
