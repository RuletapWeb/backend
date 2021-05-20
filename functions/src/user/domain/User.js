class User {
    constructor(email, alias, phone, lastPlayed=0) {
        this.email = email;
        this.alias = alias;
        this.phoneNumber = phone;
        this.lastPlayed = lastPlayed;
    }

    isAllow(){
        let check = false;
        let today = Date.now();

        // TODO: remote configurable minutes forbidden
        // * set now in 1 week!
        const forbiddenMinutesToReplay = 10080;
        const minutesPassed = (today - this.lastPlayed)/60000

        if(minutesPassed>forbiddenMinutesToReplay){
            check =  true;
        }

        return check;
    }
}

module.exports = {
    User
}