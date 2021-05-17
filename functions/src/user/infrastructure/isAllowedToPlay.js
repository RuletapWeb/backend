const {
    db
} = require('../../../utils/firestore');

const {
    isUserAllowedToPlay
} = require('../application/usersFeature');

const midlewareIsAllowedToPlay = async (userId) => {
    let userFound;
    
    const user = await db.collection("users")
        .doc(userId)
        .get()
        .then((doc)=>{
            userFound = doc.data()
    });


    const currentUserCondition = isUserAllowedToPlay(userFound);
    
    return currentUserCondition;
};

module.exports = {
    midlewareIsAllowedToPlay
}