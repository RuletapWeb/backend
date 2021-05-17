const {
    db
} = require('../../../utils/firestore');

const {
    deleteUserById
} = require('../application/usersFeature');

const deleteUser = async (id) => {
    const user = deleteUserById(id);

    let result;

    if (user.error) {
        result = user;
    } else {
        result = await db.collection("users")
            .doc(user)
            .delete();
        result = {
            success: "User deleted.",
            id: user
        }
    }

    return result;
};

module.exports = {
    deleteUser
}