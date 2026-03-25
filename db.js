// db.js
const mysql = require("mysql2");

// Configuração da conexão com o MySQL
const conexao = mysql.createConnection({
    host: "localhost",      // servidor MySQL (localhost quando é local)
    user: "root",           // usuário do MySQL
    password: "",           // senha do MySQL (deixe vazio se não colocou)
    database: "meu_sistema" // nome do banco que você criou no phpMyAdmin
});

// Conectar ao banco
conexao.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

module.exports = conexao;