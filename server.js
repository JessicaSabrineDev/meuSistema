const express = require("express");
const cors = require("cors");
const app = express();

const conexao = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/enviar", (req, res) => {
    console.log("Rota /enviar chamada!");
    console.log("Recebido do front:", req.body);

    const nome = req.body.nome;
    const email = req.body.email;

    if(!nome || !email){
        res.status(400).send("Nome e email são obrigatórios!");
        return;
    }

    const sql = "INSERT INTO usuarios (nome, email) VALUES (?, ?)";
    conexao.query(sql, [nome, email], (err, result) => {
        if(err){
          if(err.code ==="ER_DUP_ENTRY"){
            return res.status(400).send("Este email já está cadastrado!");
          }else {
            console.error("Erro ao inserir no banco:", err);
            res.status(500).send("Erro ao salvar no banco");
        } 
      }else {
            console.log("Dados salvos no banco:", nome, email);
            res.send("Dados salvos com sucesso!");
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});