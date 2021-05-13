const { Cupon } = require('../domain/Cupon');


function createCupon(brandId, description) {

    const cupon = new Cupon(brandId, description)
    
    return {
        ...cupon
    };
}

function randomCupon(cuponList) {
    const random = parseInt(Math.random()*3);

    const cupon = cuponList[random];

    return cupon
}


module.exports = {
    createCupon,
    randomCupon
}