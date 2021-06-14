const { sanitizeEntity } = require('strapi-utils');

// compares to string dates and returns a boolean
function compareDates(string1,string2){
    var date1 = Date.parse(string1);
    var date2 = Date.parse(string2);
    return date1 < date2;
}

module.exports = {
    async LastByUser(email) {     
        player = await strapi.services.player.findOne({ email });

        let rewards;
        lastReward = await strapi.services.reward.findOne({ player });
        rewards = await strapi.services.reward.find();
        if(rewards){
            rewards.forEach(
                function(currentValue, currentIndex, listObj) {
                    if(currentValue["player"]["id"] == player["id"]){
                        if(compareDates(lastReward["updatedAt"],currentValue["updatedAt"])){
                            lastReward = currentValue;
                        }
                    }
                }
            );
            return sanitizeEntity(lastReward, { model: strapi.models.reward });
        } else {
            return { message: "No rewards available at the moment", code: 404}
        }
      },
};
