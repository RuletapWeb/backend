module.exports = ({ env }) => ({
  host: env('HOST', 'strapi'),
  port: env.int('PORT', 1337),
  url: 'https://develop.ruletap.tk/api',
  email: {
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
    loginURL: env('TAP_LOGIN_URL')
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'fca46d06e0be08f2dd31f686891b6b90'),
    },
  },
});
