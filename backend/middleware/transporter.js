var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vasudevgarg7@gmail.com',
    pass: 'vasudeV7?'
  }
});

export default transporter;