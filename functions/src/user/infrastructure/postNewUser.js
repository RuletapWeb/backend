const { db } = require('../../../utils/firestore');

const { createUser } = require('../application/usersFeature');

const postNewUser = async (user) => {

    const newUser = createUser(user);

    const result = await db.collection("users")
        .add(newUser);

    return result;
};

module.exports = {
    postNewUser
}