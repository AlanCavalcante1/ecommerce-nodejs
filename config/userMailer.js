const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth:{
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD_EMAIL
  },
  tls:{
    rejectUnauthorized: false
  }
});

module.exports.sendEmail = async (email_from_user)=>{
  const emailSent = transport.sendMail({
    subject:"assunto email",
    from: "alaneluancvl7@gmail.com",
    to: email_from_user,
    html:"<h1>Ola</h1> <p>Nos da equipe que do Ecommerce estamos felizes por voce se cadastrar aqui, obg</p>"
  })
}

