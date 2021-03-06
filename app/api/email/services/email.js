const _ = require('underscore');
const fs = require('fs');
const handlebars = require('handlebars');

function validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
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
            subject: strapi.config.get('server.email.subject', 'defaultValueIfUndefined'),
            text: `.`,
            html: htmlToSend,
        };
        await strapi.plugins['email'].services.email.sendTemplatedEmail(
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
    sendEmail,
    validateEmail
}