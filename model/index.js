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
            const dados = JSON.stringify(results);
            const dadosJson = JSON.parse(dados);
            const idUsuario = dadosJson[0].idUsuario;
            req.session.idUsuario = idUsuario;
            req.session.save();
        } else {
            console.log("Credenciais incorretas.")
            res.status(400).send("Não logado.")
        }
    })
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
    var idUsuario = getIdUsuario();

    var dia = req.body.dia;
    var mes = req.body.mes;
    var ano = req.body.ano;
    
    if (categoria == "salario" || categoria == "emprestimo" || categoria == "bonus" || categoria == "rendimento" || categoria == "dividendos"
      || categoria == "venda" || categoria == "outras_rendas") { 
      tipo = "R";
      } else tipo = "D";

    // SE REPETE = 0 INSERE UMA VEZ. SE REPETE MAIOR QUE 0 INSERE VARIAS.
    if (repete == 0) {
        var query = `INSERT INTO finança (Descricao, Valor, Data, Tipo, Categoria, Usuario_idUsuario) VALUES (
        '${descricao}', ${valor}, '${data}', '${tipo}', '${categoria}', ${idUsuario})`;
        console.log(query)
        db.query(query, (err, results) => {
            console.log(results);
            res.send(data)
        });

    } else {
        while (contador < repete) {
            // Verifica se dia é maior que 28 no mês de fevereiro. Se for, corrige a data.
            if (mes == 2 && dia > 28 ) {
                var dataRepete = `${ano}-${mes}-28`;
            } else { 
                var dataRepete = `${ano}-${mes}-${dia}`;
            }
            contador = contador + 1;
            var query = `INSERT INTO finança (Descricao, Valor, Data, Tipo, Categoria, Usuario_idUsuario) VALUES (
                '${descricao}', ${valor}, '${dataRepete}', '${tipo}', '${categoria}', ${idUsuario})`;
            db.query(query, (err, results) => {
                console.log(err);
                console.log(results);
            });
            var mes = mes + 1;
                if (mes > 12) { 
                    mes = 1;
                    ano = ano + 1;
                }
        } 
    }
});

app.post("/addpatrimonio", (req,res)=> {
    // Inserir patrimonio na tabela patrimonio
});

app.post("/financas", (req, res) => {
    // Buscar finanças do usuário (receitas e despesas)
    var data = req.body.data;
    var tipo = req.body.tipo;
    var dataFim = req.body.dataFim;
    var idUsuario = getIdUsuario();

    var query = `select * from finança where Data between '${data}' and '${dataFim}' and Usuario_idUsuario = 
    ${idUsuario} and tipo = '${tipo}'`;

    console.log("QUERY: " + query)

    db.query(query, (err, results)=> {
        res.send(results);
    })
});

app.post("/receitas", (req, res)=>{

    var mes = req.body.data;
    var proxMes = req.body.dataFim;

    console.log(mes);
    console.log(proxMes);
    
    const receitas = `select SUM(Valor) as receitas from finança where tipo = "R" and Data between
    '${mes}' and '${proxMes}' and usuario_idusuario = ${getIdUsuario()}`;

    console.log(receitas);

    db.query(receitas, (err, results)=>{
        console.log(results);
        res.send(results);
    });
});

app.post("/despesas", (req, res)=>{
    var mes = req.body.data;
    var proxMes = req.body.dataFim;
    
    const despesas = `select SUM(Valor) as despesas from finança where tipo = "D" and Data between
    '${mes}' and '${proxMes}' and usuario_idusuario = ${getIdUsuario()}`;

    db.query(despesas, (err, results)=>{
        console.log(results);
        res.send(results);
    });
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

app.get("/nome", (req, res)=>{
    const idUser = getIdUsuario();
    const query = `select * from usuario where idusuario = ${idUser}`;
    console.log(query);
    db.query(query, (err, results)=> {
        console.log(results);
        res.send(results);
    })
});

app.get("/sair", (req, res)=>{
    req.session.destroy();
    store.clear();
    console.log(store);
    res.send("Fim");
});

// INICIANDO SERVIDOR
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
});