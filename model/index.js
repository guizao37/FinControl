const express = require('express')

const app = express();
const mysql = require('mysql')
const cors = require('cors');

const bodyParser = require('body-parser');
const port = 3301;

// CONFIGURANDO SESSÃO
const session = require('express-session')
const store = new session.MemoryStore();

app.use(session({
    secret: "tcc2022",
    saveUninitialized: false,
    resave: false,
    store: store
}));

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: "mydb"
  });
   
db.connect(function(err) {
    if (err) {
      console.error('ERRO: ' + err);
      } else console.log('Conexão com o banco de dados realizada com sucesso.');
  });

app.post("/register", async(req,res)=>{
    const email = "'" + req.body.email + "'"
    console.log(email)
    const senha = "'" + req.body.senha + "'"
    console.log(senha)
    const nome = "'" + req.body.nome + "'"
    console.log(nome)
    const findEmail = `SELECT * FROM usuario WHERE Email = ${email}`
    console.log(findEmail)
    db.query(findEmail, (err, results) => {
        console.log(results)
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
});

app.post("/login", async(req,res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
    const validate = "SELECT * FROM USUARIO WHERE Email = '" + email + "' AND Senha = '" + senha + "'";
    db.query(validate, (err, results)=>{
        if (results.length > 0) {
            console.log("Autenticado")
            res.status(200).send("Logado")
            req.session.save();
        } else {
            console.log("Credenciais incorretas.")
            res.status(400).send("Não logou.")
        }
    })
});

app.get("/teste", (req,res)=>{
    console.log(getIdUsuario());
    res.send("Teste")
});

app.post("/addfinanca", (req, res) => {
    const valor = (req.body.valor).replace('.','').replace(',','.');
    const categoria = req.body.categoria;
    const data = req.body.data;
    const descricao = req.body.descricao;
    const repete = req.body.repete;
})

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
});

function getIdUsuario () {
    const dados = JSON.stringify(store);
    const parseDados = JSON.parse(dados);
    const sessionValues = Object.values(parseDados.sessions);
    const sessionValuesJson = JSON.parse(sessionValues);
    const idUsuario = sessionValuesJson.idUsuario;
    return idUsuario;
}