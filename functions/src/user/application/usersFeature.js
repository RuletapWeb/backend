const { User } = require('../domain/User');
const { validateEmail } = require('../../../utils/validateEmail');



/* -------------------------------------------------------------------------- */
/*                       FEATURE: creating a user object                      */
/* -------------------------------------------------------------------------- */

function createUser(payload) {
    const { email, phone } = payload;
    let user = { error: "Not valid data sended." };

    if(validateEmail(email)){
        let alias = email.split('@')[0];

        user = new User(email, alias, phone);
    }

    return {
        ...user
    };
}

/* -------------------------------------------------------------------------- */
/*                    FEATURE: deleting user if ID is valid                   */
/* -------------------------------------------------------------------------- */

function deleteUserById(id) {
    id = id.toString();
    let user = { error: "Not valid ID sended"};

    if (id.length == 20) {
        return id;
    }
    
    return user;
}

/* -------------------------------------------------------------------------- */
/*                FEATURE: checking if user is allowed to play                */
/* -------------------------------------------------------------------------- */

function isUserAllowedToPlay(user){
    const { email, phoneNumber, lastPlayed, alias } = user;

    const currentUser = new User(email,alias,phoneNumber,lastPlayed);

    const validToPlay = currentUser.isAllow();

    return validToPlay;

}

module.exports = {
    createUser,
    deleteUserById,
    isUserAllowedToPlay
};