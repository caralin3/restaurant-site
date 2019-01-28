// interface EmailConfig {
//   auth: {
//     user: string;
//     pass: string;
//   };
//   service: string;
// }

// interface MailOptions {
//   from: string;
//   to: string;
//   subject: string;
//   text: string;
// }

const nodemailer = require('nodemailer');
const emailConfig = require('./config.ts');

module.exports = {
  mailer: async function (req, res) {
    // Set the content type of the response to JSON
    res.setHeader('Content-type', 'application/json');
    const { from, text } = req.query;
    let account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
      }
    });
    const mailOptions = {
      from,
      to: 'caralin3@gmail.com',
      subject: 'Restaurant Contact Form Inquiry',
      text
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(200).send('Email sent: ' + mailOptions.to + mailOptions.text + info.response);
      }
    });
  }
};
