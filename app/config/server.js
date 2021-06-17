module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  email: {
    creds: {
      email: "RuleTAP.service@gmail.com",
      password: "eJZmMM51Uw5r",
    },
    subject: "TAP - Tu premio!",
    templatePath: "/srv/app/public/email-tap.html"
  },
  token:{
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    length: 10
  },
  respones:{
    playable: 1,
    redeemed: 2,
    redeemable: 3
  },
  tap:{
    loginURL: env('LOGIN_URL')
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'fca46d06e0be08f2dd31f686891b6b90'),
    },
  },
});
