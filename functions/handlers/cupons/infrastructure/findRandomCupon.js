const {
    db
} = require('../../../utils/firestore');

const { randomCupon } = require('../application/cuponsFeatures');

const findRandomCupon = async () => {

    const cuponsFromDB = await db.collection("cupons").get();

    const cuponList = [];

    cuponsFromDB.forEach((doc) => {
        cuponList.push({ ...doc.data() })
     })

    
    console.log(cuponList);

    const oneRandomCupon = await randomCupon(cuponList);
   
    return oneRandomCupon;
   
};

module.exports = {
    findRandomCupon
}