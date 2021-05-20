const {
    db
} = require('../../../utils/firestore');

const {
    createUser
} = require('../application/usersFeature');

const postNewUser = async (user) => {

    const newUser = createUser(user);

    let result;

    if (newUser.error) {
        result = newUser;
        return result;
    }

    try {
        result = await db.collection("users")
            .add(newUser);
        result = {
            success: "User added.",
            id: result._path.segments[1]
        }
    } catch (error) {
        result = {
            server: error
        }
    }

    return result;
};

module.exports = {
    postNewUser
}