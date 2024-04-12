const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const logic = express.Router();
const bd = require('../config/database');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'favianaguilar7@gmail.com',
    pass: 'ugzn xmun fywm txsz'
  }
});

const upload = multer({ storage: multer.memoryStorage() });

logic.post("/tablas", async (req, res, next) => {
    const rows = await bd.query(`SHOW TABLES;`);
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});

logic.post("/opciones", async (req, res, next) => {
    const {name} = req.body;
    console.log(name);
    const rows = await bd.query(`SELECT * FROM ${name};`);
    return rows.length > 0 ? res.status(200).json({code:200, message: rows}) : res.status(404).send({code: 404, message: "empleado no encontrado"});
});

logic.post('/enviar-pdf', upload.single('pdf'), (req, res) => {
    console.log("Preparando correo");
  let mailOptions = {
    from: 'favianaguilar7@gmail.com',
    to: 'favianaguilar7@gmail.com',
    subject: 'Alerta de movimiento',
    text: 'Se genero una consulta donde se estan mostrando los datos en graficas',
    // attachments: [
    //   {
    //     filename: req.file.originalname,
    //     content: req.file.buffer,
    //     contentType: 'application/pdf'
    //   }
    // ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log("Enviando.....");
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado: ' + info.response);
    }
  });
});

module.exports = logic;