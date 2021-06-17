module.exports = ({ env }) => ({
    // ...
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENGRID_API_KEY',)
      },
      settings: {
        defaultFrom: env('SENGRID_EMAIL_FROM',),
        defaultReplyTo: env('SENGRID_DEFAULT_REPLY',),
        testAddress: env('SENGRID_TEST_ACCOUNT',),
      },
    },
    // ...
  });