const express = require('express');
// const jwt = require('jsonwebtoken');
const user = express.Router();
const bd = require('../config/bduser');
const { JsonWebTokenError } = require('jsonwebtoken');

user.post("/login", async (req, res, next)=>{
    const {username, password} = req.body;
    const query = `SELECT * FROM t_usuarios WHERE cNombre LIKE '${username}' AND cContrasenia = '${password}';`;
    const rows = await bd.query(query);
    if(username && password){
        if(rows.length == 1){
            const ms = `username : ${rows[0].cNombre}, password: ${rows[0].cContrasenia}`;
            // const token = jwt.sign({
            //     user_id: rows[0].user_id,
            //     user_mail: rows[0].user_mail
            // }, "debugkey");
            return res.status(200).json({code: 200, message: ms});
        }
        else{
            return res.status(200).json({code: 401, message: "Usuario y/o constraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});
module.exports = user;