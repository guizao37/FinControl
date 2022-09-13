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

app.get("/create", async(req,res)=>{
    let findEmail = "SELECT * FROM USUARIO WHERE Email = '" + req.body.emailUsuario + "';"
    db.query(findEmail, (err, results) => {
        numRows = results.length;
        console.log(results)
        console.log(numRows)
    })
})

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001')
})