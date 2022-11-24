// CONFIGURAÇÕES GERAIS
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3301;


// CONFIGURANDO SESSÃO
const session = require('express-session');
const store = new session.MemoryStore();
app.use(session({
    secret: "tcc2022",
    saveUninitialized: false,
    resave: false,
    store: store
}));


// CONFIGURANDO MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// CONEXÃO COM BD
var db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: "mydb"
  });
db.connect(function(err) {
    if (err) {
      console.error('Erro ao realizar conexão com o banco de dados: ' + err);
      } else console.log('Conexão com o banco de dados realizada com sucesso.');
  });


// CONFIGURANDO REQUISIÇÕES
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
            res.status(200).send("Logado.")
            req.session.save();
        } else {
            console.log("Credenciais incorretas.")
            res.status(400).send("Não logado.")
        }
    })
});

app.get("/teste", (req,res)=>{
    res.send("Teste.")
});

app.post("/add", (req, res) => {
    var contador = 0;
    var valor = (req.body.valor).replace('.','').replace(',','.');
    var categoria = req.body.categoria;
    var data = req.body.data;
    var descricao = req.body.descricao;
    var repete = req.body.repete;
    var tipo = req.body.tipo;
    var idUsuario = getIdUsuario();

    // SE REPETE = 0 INSERE UMA VEZ. SE REPETE MAIOR QUE 0 INSERE VARIAS.
    if (repete == 0) {
        var query = `INSERT INTO finança (Descricao, Valor, Tipo, Data, Categoria, idUsuario) VALUES (
        ${descricao}, ${valor}, ${tipo}, ${data}, ${categoria}, ${idUsuario})`;
        db.query(query, (err, results) => {
            console.log(err);
            console.log(results);
        });

    } else {
        while (contador < repete) {
            var query = `INSERT INTO finança (Descricao, Valor, Tipo, Data, Categoria, idUsuario) VALUES (
            ${descricao}, ${valor}, ${tipo}, ${data}, ${categoria}, ${idUsuario})`;
            db.query(query, (err, results) => {
                console.log(err);
                console.log(results);
            });
            // Transformar variavel data em tipo date e somar 1 mês
        }
    }
});

app.post("/addpatrimonio", (req,res)=> {
    // Inserir patrimonio na tabela patrimonio
});

app.get("/financas", (req, res) => {
    // Buscar finanças do usuário (receitas e despesas)
});

app.get("/patrimonio", (req, res) => {
    // Buscar patrimônio do usuário (bens e dívidas)
});

app.get("/usuario", (req, res) => {
    // Busca dados pessoais do usuário
});

app.get("/alterar", (req, res)=>{
    // Altera senha do usuário
});

app.get("/recuperar", (req, res)=>{
    // Envia e-mail para recuperar senha do usuário
});

// INICIANDO SERVIDOR
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
});


// FUNÇÃO QUE RETORNA ID DO USUÁRIO
function getIdUsuario () {
    const dados = JSON.stringify(store);
    const parseDados = JSON.parse(dados);
    const sessionValues = Object.values(parseDados.sessions);
    const sessionValuesJson = JSON.parse(sessionValues);
    const idUsuario = sessionValuesJson.idUsuario;
    return idUsuario;
}
