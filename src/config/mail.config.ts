import nodemailer from 'nodemailer';

const transporter: any = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'c4mahlangu@gmail.com',
    pass: 'mahlangu3003!'
  }
});

export default transporter;
