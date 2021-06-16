module.exports = ({ env }) => ({
    // ...
    email: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: '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',
      },
      settings: {
        defaultFrom: 'ruletap.service@gmail.com',
        defaultReplyTo: 'ruletap.service@gmail.com',
        testAddress: 'lautaro.baltar@gmail.com',
      },
    },
    // ...
  });