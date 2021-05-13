const { db } = require('../../../utils/firestore');

const { deleteUserById } = require('../application/usersFeature');

const deleteUser = async (id) => {
    const user = deleteUserById(id);

    let result;
    if (user) {
        result = await db.collection("users")
            .doc(user)
            .delete();

    } else {
        result = { error:"ID invalido" };
    }

    return result;
};

module.exports = {
    deleteUser
}