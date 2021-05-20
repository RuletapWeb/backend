const {
    db
} = require('../../../utils/firestore');

const {
    listUsers
} = require('../application/usersFeature');

const getAllUsers = async () => {

    let listedFromFirebase = [];
    let result = [];

    try {
        await db.collection('users')
        .get()
        .then(data=>{
            data.forEach(doc=>{
                listedFromFirebase.push({...doc.data(),docID: doc.id})
            })
        })
        
        console.log("INFRA");
        console.log(listedFromFirebase);

        result = listUsers(listedFromFirebase);
        

    } catch (error) {
        return error
    }

    return result;
};

module.exports = {
    getAllUsers
}