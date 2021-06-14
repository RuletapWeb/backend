var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

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
};

smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: strapi.config.get('server.email.creds.email', 'defaultValueIfUndefined'),
    pass: strapi.config.get('server.email.creds.password', 'defaultValueIfUndefined'),
  },
});

module.exports = {
  async send(ctx) {
    readHTMLFile(strapi.config.get('server.email.templatePath', 'defaultValueIfUndefined'), function(err, html) {
      var template = handlebars.compile(html);
      var htmlToSend = template(ctx);
      var mailOptions = {
          from: strapi.config.get('server.email.creds.email', 'defaultValueIfUndefined'),
          to : ctx.playerEmail,
          subject : strapi.config.get('server.email.subject', 'defaultValueIfUndefined'),
          html : htmlToSend
      };
      smtpTransport.sendMail(mailOptions, function (error, response) {
          if (error) {
              console.log(error);
              callback(error);
          }
      });
    });
  },
};