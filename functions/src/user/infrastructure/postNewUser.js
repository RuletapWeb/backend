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
    } else {
        result = await db.collection("users")
            .add(newUser);
        result = {
            success: "User added.",
            id: result._path.segments[1]
        }
    }

  
    return result;
};

module.exports = {
    postNewUser
}