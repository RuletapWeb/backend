const {
    User
} = require('../domain/User');

function createUser(payload) {
    const { id, email } = payload;

    const user = new User(id, email);

    return {
        ...user
    };
}

function deleteUserById(id) {
    if (id.length > 5) {
        console.log(id);
        return id
    }
    console.log("El id no era valido")
    return null
}

module.exports = {
    createUser,
    deleteUserById
}