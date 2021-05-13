const { Promo } = require('../domain/Promos');


function createPromo(brandId, description) {

    const promo = new Promo(brandId, description)
    
    return {
        ...promo
    };
}

function randomPromo(promoList) {
    const random = parseInt(Math.random()*3);

    const promo = promoList[random];

    return promo
}


module.exports = {
    createPromo,
    randomPromo
}