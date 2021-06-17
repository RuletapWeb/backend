const userType = {
    COMPANY: 'company',
    PERSON: 'person',
}

async function login(email, password) {
    const defaultContext = { platform: 'android', version: '99.99.99' }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, ...defaultContext }),
    }
    try {
        const loginResponse = await fetch(await strapi.config.get('server.tap.loginURL', 'defaultValueIfUndefined'), requestOptions)
        if (!loginResponse.ok) {
            const text = await loginResponse.text()
            throw new Error(text)
        }
        const loginBody = await loginResponse.json()
        if(loginBody){
            if(loginBody.user){
                if (loginBody.user.account_type !== userType.COMPANY) {
                    throw new Error('La plataforma solo puede ser usada por compañías')
                }
            }
        }
        const loginChinoHeader = loginResponse.headers.get('x-chino-token')
        loginBody.user.chinoToken = loginChinoHeader
        localStorage.setItem('user', JSON.stringify(loginBody.user))
        return loginBody.user
    } catch (err) {
        console.warn(err)
        return Promise.reject(err)
    }
}

module.exports = {
    login
};
