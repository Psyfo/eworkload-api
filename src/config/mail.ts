import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'c4mahlangu@gmail.com',
    pass: 'mahlangu3003!'
  }
});

export default transporter;
