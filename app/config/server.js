module.exports = ({ env }) => ({
  host: env('HOST', 'strapi'),
  port: env.int('PORT', 1337),
  url : env('STRAPI_API_URL'),
  email: {
    subject: env('EMAIL_SUBJECT'),
    templatePath: "/srv/app/public/email-tap.html"
  },
  token:{
    chars: env('TOKEN_CHARS'),
    length: env('TOKEN_LENGTH'),
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
