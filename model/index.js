const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3301;

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
    const email = "'" + req.body.email + "'"
    console.log(email)
    const senha = "'" + req.body.senha + "'"
    console.log(senha)
    const nome = "'" + req.body.nome + "'"
    console.log(nome)
    const findEmail = "SELECT * FROM USUARIO WHERE Email =" + email + ";"
    db.query(findEmail, (err, results) => {
        var numRows = results.length;
        if (numRows==0) {
            let registerUser = "INSERT INTO usuario (Nome, Email, Senha) VALUES (" + nome + "," + email  + "," + senha + ");"
            console.log(registerUser)
            db.query(registerUser, (err, results)=>{
                console.log(results)
                var rows = results.affectedRows;
                if (rows = 1) {
                    res.status(200).send("Cadastrado com sucesso.")
                    console.log("Cadastrado com sucesso.")
                } else {
                    res.status(400).send("Deu errado")
                }
            })
        } else {
            res.status(400).send("Usuário já cadastrado.")
            console.log("Usuário já cadastrado.")
        }
    })
})



app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
})
