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
    var parcelas = parseInt(req.body.parcelas);
    var data = req.body.data;
    var valor = (req.body.valor).replace('.','').replace(',','.');
    var descricao = req.body.descricao;
    var categoria = req.body.categoria;
    var tipo = "";
    var contador = 0;
    var dia = req.body.dia;
    var mes = req.body.mes;
    var ano = req.body.ano;
    valor = (valor/parcelas).toFixed(2);

    if (categoria == "veiculo" || categoria == "imovel" || categoria == "aplicacao" ||categoria == "outros_bens") { 
        tipo = "B";
    } else {tipo = "D";}
    
    if (parcelas == 1){
    var query = `insert into patrimonio (Valor, Data, Descricao, Tipo, Categoria, Usuario_idUsuario) VALUES (
        ${valor}, '${data}', '${descricao}', '${tipo}', '${categoria}', ${getIdUsuario()}
    )`;
    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            res.status(400).send("Ocorreu um erro");
        } else {console.log(results); res.status(200).send("Entrada adicionada");}
    });
    } else {
        while(parcelas>contador){
            contador = contador + 1;
            if (mes == 2 && dia > 28 ) {
                var dataRepete = `${ano}-${mes}-28`;
            } else { 
                var dataRepete = `${ano}-${mes}-${dia}`;
            }
            var query = `insert into patrimonio (Valor, Data, Descricao, Tipo, Categoria, Usuario_idUsuario) VALUES (
            ${valor}, '${dataRepete}', '${descricao}', '${tipo}', '${categoria}', ${getIdUsuario()})`;
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

app.post("/dashboardpatrimonio", (req, res) => {
    // Buscar finanças do usuário (receitas e despesas)
    var data = req.body.data;
    var tipo = req.body.tipo;
    var dataFim = req.body.dataFim;
    var idUsuario = getIdUsuario();

    if (tipo == "bens") {tipo = "B"} else {tipo = "D"}

    var query = `select * from patrimonio where Data between '${data}' and '${dataFim}' and Usuario_idUsuario = 
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
        console.log(despesas);
        res.send(results);
    });
});


app.get("/bens", (req, res) => {
    var query = `select SUM(Valor) as BemTotal from patrimonio where Tipo = "B" and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(query,(err, results) => {
        res.send(results);
    });
});

app.get("/dividas", (req, res) => {
    var query = `select SUM(Valor) as DividaTotal from patrimonio where Tipo = "D" and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(query,(err, results) => {
        res.send(results);
    });
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

app.post("/delete", (req,res)=>{
    const query = `delete from finança where idFinança = ${req.body.idFinanca}`;
    db.query(query, (err,results)=>{
        console.log(results);
        res.send(results);
    })
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

app.get("/finances", (req,res)=>{
    const query = `SELECT * FROM finança WHERE Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(query, (err, results)=>{
        res.send(results);
    })
});

app.post("/edit", (req,res)=>{
    const query = `select * from finança where idFinança = ${req.body.idFinanca}`;
    db.query(query,(err, results)=>{
        console.log(results);
        res.send(results);
    });
});

app.post("/extrato", (req,res)=>{
    var dataFim = req.body.dataFim;
    var data = req.body.data;
    const query = `select * from finança where Data between '${data}' and '${dataFim}' and Usuario_idUsuario = 
    ${getIdUsuario()}`;
    db.query(query, (err, results)=>{
        res.send(results);
    });
});

app.get("/sair", (req, res)=>{
    req.session.destroy();
    store.clear();
    console.log(store);
    res.send("Fim");
});

app.get("/agosto", (req,res)=>{
    const q = `select SUM(Valor) as Valor from patrimonio where Data between '2022-08-01' and '2022-08-31' and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(q, (err, results)=>{
        res.send(results);
        console.log(results)
        console.log(q)
    });
})

app.get("/setembro", (req,res)=>{
    const q = `select SUM(Valor) as Valor from patrimonio where Data between '2022-08-01' and '2022-09-30' and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(q, (err, results)=>{
        res.send(results);
        console.log(results)
        console.log(q)
    });
})
app.get("/outubro", (req,res)=>{
    const q = `select SUM(Valor) as Valor from patrimonio where Data between '2022-08-01' and '2022-10-31' and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(q, (err, results)=>{
        res.send(results);
        console.log(results)
        console.log(q)
    });
})
app.get("/novembro", (req,res)=>{
    const q = `select SUM(Valor) as Valor from patrimonio where Data between '2022-08-01' and '2022-11-30' and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(q, (err, results)=>{
        res.send(results);
        console.log(results)
        console.log(q)
    });
})
app.get("/dezembro", (req,res)=>{
    const q = `select SUM(Valor) as Valor from patrimonio where Data between '2022-08-01' and '2022-12-31' and Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(q, (err, results)=>{
        res.send(results);
        console.log(results)
        console.log(q)
    });
})

app.get("/listapatrimonio", (req,res)=>{
    const query = `SELECT * FROM patrimonio WHERE Usuario_idUsuario = ${getIdUsuario()}`;
    db.query(query, (err, results)=>{
        res.send(results);
    })
});

app.post("/deleteP", (req,res)=>{
    const query = `delete from patrimonio where idPatrimonio = ${req.body.idPatrimonio}`;
    db.query(query, (err,results)=>{
        console.log(results);
        res.send(results);
    })
});

// INICIANDO SERVIDOR
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port)
});