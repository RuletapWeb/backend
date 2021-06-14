module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  test: "this is a test value",
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
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'fca46d06e0be08f2dd31f686891b6b90'),
    },
  },
});
