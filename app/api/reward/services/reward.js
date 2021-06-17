const { sanitizeEntity } = require('strapi-utils');

// compares to string dates and returns a boolean
function compareDates(string1,string2){
    var date1 = Date.parse(string1);
    var date2 = Date.parse(string2);
    return date1 < date2;
}

async function LastByUser(email) {     
    player = await strapi.services.player.findOne({ email });
    let rewards;
    lastReward = await strapi.services.reward.findOne({ player });
    rewards = await strapi.services.reward.find();
    if(rewards){
        rewards.forEach(
            function(currentValue) {
                if(currentValue["player"]["id"] == player["id"]){
                    if(compareDates(lastReward["updatedAt"],currentValue["updatedAt"])){
                        lastReward = currentValue;
                    }
                }
            }
        );
        if(lastReward.redeemed){
            lastReward.status = await strapi.config.get('server.respones.redeemed', 'defaultValueIfUndefined');
        } else {
            lastReward.status = await strapi.config.get('server.respones.redeemable', 'defaultValueIfUndefined');
        }
        return lastReward;
    } else {
        return { message: "No rewards available at the moment", code: 404}
    }
}

async function rewardByShop(email){
    shop = await strapi.services.shop.findOne({ email });
    if(shop){
        rewards = await strapi.services.reward.find();
        let response = {
            redeemed: 0,
            available: 0
        };
        if(rewards){
            rewards.forEach(
                function(currentValue) {
                    if(currentValue.shop.email == email){
                        if(currentValue.redeemed){
                            response.redeemed += 1;
                        } else {
                            response.available += 1;
                        }
                    }
                }
            )
            return response;    
        } else {
            return null;
        }
    } else {
        return null;
    }
}

async function redeem(ctx){
    let token = ctx.request.body.token;
    let reward = await strapi.services.reward.findOne({ token });
    if(reward){
        if(reward.shop.email == ctx.request.body.shop){
            if(reward.player.email == ctx.request.body.email){
                if(reward.redeemed){
                    reward.status = await strapi.config.get('server.respones.redeemed', 'defaultValueIfUndefined');
                    return reward;
                } else {
                    await strapi.services.reward.update(
                        { id: reward["id"]},
                        {
                            redeemed: true,
                        }    
                    )
                    output = await strapi.services.reward.findOne({ token });
                    output.status = await strapi.config.get('server.respones.redeemable', 'defaultValueIfUndefined');
                    return output;
                }
            } else {
                ctx.send({
                    message: 'Email incorrect'
                }, 400);
            }
        } else {
            ctx.send({
                message: 'Incorrect Store'
            }, 400);
        }
    } else {
        ctx.send({
            message: 'Incorrect Token'
        }, 400); 
    }
}

module.exports = {
    LastByUser,
    rewardByShop,
    redeem
};
