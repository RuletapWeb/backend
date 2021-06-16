const _ = require('underscore');
const fs = require('fs');
var handlebars = require('handlebars');

// Returns a random integer between a min (included) and a max (excluded)
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Creates a token based in the environment configuration for characters
function makeToken(length) {
    var result           = '';
    var characters       = strapi.config.get('server.token.chars', 'defaultValueIfUndefined');
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// Creates a Reward linked to the user, token, prize and the shop
async function craeteReward(user, prize){
    email = prize["shop"]["email"]
    shop = await strapi.services.shop.findOne({ email });
    body = {
        "player": user,
        "shop": shop,
        "prize": prize,
        "token": makeToken(strapi.config.get('server.token.length', 'defaultValueIfUndefined')),
    };
    return strapi.services.reward.create(body)
}

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
}

async function sendEmail(reward) {
    readHTMLFile(strapi.config.get('server.email.templatePath', 'defaultValueIfUndefined'), async (err, html) => {
        var template = handlebars.compile(html);
        var replacements = {
            token: reward.token,
            playerEmail: reward.player.email,
            shop: reward.shop.name,
            shopAddress: reward.shop.address,
            reward: reward.prize.title
        };
        var htmlToSend = template(replacements);
        const emailTemplate = {
            subject: 'TAP - Feliciationes <%= user.name %>!',
            text: `.`,
            html: htmlToSend,
        };
        strapi.plugins['email'].services.email.sendTemplatedEmail(
            {
                to: reward.player.email,
            },
            emailTemplate,
            {
                user: _.pick(user, ['username', 'email', 'name', 'lastname']),
            }
        );
    });
}

module.exports = {
    async getWinner(email) {
        user = await strapi.services.player.findOne({ email });

        // Create array based in each prize probability
        let prizes;
        prizes = await strapi.services.prizes.find()
        const prize_pool = []
        prizes.forEach(   function(currentValue) {
            if(currentValue["quantityLeft"] > 0){
                for ( i = 0; i < currentValue["probability"]; i++){
                    prize_pool.push(currentValue);
                }
            }
        });

        console.log("here?")

        if(prize_pool.length > 0 ){
            winner = prize_pool[getRandomArbitrary(0,prize_pool.length)];
            await strapi.query('prizes').update(
                { id: winner["id"]},
                {
                    quantityLeft: (winner["quantityLeft"] -1 ),
                }    
            )
            await strapi.query('player').update(
                { id: user.id },
                {
                    lastPlayed: Date.now(),
                }    
            )
            reward = await craeteReward(user,winner);

            // Sends email to player with token and prize information
            sendEmail(reward)

            // Adding status to response
            reward.status = strapi.config.get('server.respones.playable', 'defaultValueIfUndefined');

            return reward;
        } else {
            return { message: "No prizes available", code: 404};
        }
      },
};
