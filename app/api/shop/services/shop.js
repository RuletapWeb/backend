const fetch = require("node-fetch");

async function checkShop(ctx){
    const {email} = ctx.request.body;
    let shop = await strapi.services.shop.findOne({ email });
    if( shop == null ){
        return false;
    } else {
        return true;
    }

}

async function login(ctx) {
    if(await checkShop(ctx)){
        const userType = {
            COMPANY: 'company',
            PERSON: 'person',
        }
        const {email, password} = ctx.request.body
        const defaultContext = { platform: 'android', version: '99.99.99' }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, ...defaultContext }),
        }
        try {
            console.log(await strapi.config.get('server.tap.loginURL', 'defaultValueIfUndefined'))
            const loginResponse = await fetch(await strapi.config.get('server.tap.loginURL', 'defaultValueIfUndefined'), requestOptions)
            if (!loginResponse.ok) {
                console.log("OK")
                const text = await loginResponse.text()
                throw new Error(text)
            }
            console.log("LOGIN OK")
            const loginBody = await loginResponse.json()
            if(loginBody){
                if(loginBody.user){
                    if (loginBody.user.account_type !== userType.COMPANY) {
                        throw new Error('La plataforma solo puede ser usada por compañías')
                    }
                }
            }
            return loginBody.user
        } catch (err) {
            console.warn(err)
            ctx.send({
                message: 'Email/Password Incorrect'
            }, 404);
        }
    } else {
        ctx.send({
            message: 'Email/Password Incorrect'
        }, 404);
    }
}

module.exports = {
    login
};
