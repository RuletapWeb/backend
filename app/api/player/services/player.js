/* ---------------------------- busqueda del user --------------------------- */
async function userLookup(ctx) {
    email = ctx.request.body.email;
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

function validatePhone(phone){
    const re = /^(?:11|[2368]\d)\d{8}$/;
    return re.test(String(phone).toLowerCase());
}

module.exports = {
    validateLastplayed,
    userLookup,
    validatePhone
};