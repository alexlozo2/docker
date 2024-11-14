const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'variables.env' });

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Por ejemplo, 'Gmail'
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

const enviarCodigoVerificacion = (email, codigoVerificacion) => {
  const mailOptions = {
      from: process.env.email,
      to: email,
      subject: 'Código de Verificación',
      text: `Tu código de verificación es: ${codigoVerificacion}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Correo enviado: ' + info.response);
      }
  });
};

const envioToken = (email, codigoToken) => {
  const mailOptions = {
      from: process.env.email,
      to: email,
      subject: 'Token de verificación',
      text: `Tu token: ${codigoToken}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Correo enviado: ' + info.response);
      }
  });
};



module.exports = { enviarCodigoVerificacion, envioToken};
