const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

// https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4MtkSLOQcnXIe3rsHXXooYTbq1_6qRFgw3XE5S2XJOJTCDzW3LH2R7vLqasO33mfgmRmvPNv26rbFMoBlkOXy1MM_xeeg
class SendMailService {
  #transporter;
  constructor() {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.MAIL_USR,
          pass: process.env.MAIL_PWD,
        },
      });
      this.#transporter = transporter;
    } catch (error) {
      throw error;
    }
  }

  async send({sender, receiver, subject, path}, variables) {
    const templateFile = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFile);
    const html = templateParse(variables);

    await this.#transporter.sendMail({
      from: sender,
      to: receiver,
      subject: subject,
      html: html,
    });
  }
}

module.exports = new SendMailService();
