const express = require('express')
const session = require('express-session')

const app = express();
const mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3301;

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
    secret:"JoaoMandriao",
    saveUninitialized: true,
    resave: true
}))

const db = mysql.createPool({
    host: "127.0.0.1",
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'mydb'
})

app.post("/register", async(req,res)=>{
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

app.post("/login", async(req,res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
    const validate = "SELECT * FROM USUARIO WHERE Email = '" + email + "' AND Senha = '" + senha + "'";
    db.query(validate, (err, results)=>{
        if (results.length > 0) {
            console.log("Autenticado")
            res.status(200).send("Logado")
        } else {
            console.log("Credenciais incorretas.")
            res.status(400).send("Não logou.")
        }
    })
})


app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
})
