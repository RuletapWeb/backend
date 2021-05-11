const creationAndExpiration = (daysToExpire) => {
    //creation
    let date1 = new Date();
    // setting expiration in one week
    let date2 = new Date().setDate(date1.getDate() + (1+parseInt(daysToExpire)));
    //setting expiration hours
    date2 = new Date(date2).setHours(00, 00, 00);
    //parsing dates
    date2 = new Date(date2);
    //adding in object dates: {created, expires}
    let dates = {
        created:date1,
        expires:date2
    };

    return dates;
}

module.exports = { creationAndExpiration };