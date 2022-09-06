const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const db = mysql.createPool({
    host: "127.0.0.1",
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'mydb'
})

app.post("/create", async(req,res)=>{
    let findEmail = "SELECT * FROM USUARIO WHERE Email = '" + req.body.emailUsuario + "';"
    db.query(findEmail, (err, results) => {
        numRows = results.length;
        console.log(results)
        console.log(numRows)
        if (numRows > 0){
            var status = 200
        } else {status = 404}
        res.sendStatus(status)
        if (numRows == 0) {
            let sqlRegister = "INSERT INTO usuario (Nome, Email, Senha) VALUES ('" + req.body.nomeUsuario + "','" + req.body.emailUsuario + "','" + 
            req.body.senhaUsuario + "');"
            db.query(sqlRegister, (err, result) => {
            })
        }
    })
})

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})