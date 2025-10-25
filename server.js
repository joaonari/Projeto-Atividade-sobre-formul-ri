const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'form-media.html'));
});

app.post("/processar-media", (req, res) => {

  const { nome, nota1, nota2 } = req.body;

  
  const n1 = parseFloat(nota1);
  const n2 = parseFloat(nota2);

  
  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).send("<h2>Erro: Notas inválidas. Certifique-se de que nota1 e nota2 são números.</h2>");
  }

  
  const media = (n1 + n2) / 2;
  let situacao = "";

  
  if (media >= 6) {
    situacao = "Aprovado";
  } else if (media >= 2 && media < 6) {
    situacao = "Exame Final";
  } else { // media < 2
    situacao = "Reprovado";
  }


  res.send(`<h2>Resultado da Avaliação:</h2>
            <p><strong>Aluno:</strong> ${nome}</p>
            <p><strong>Nota 1:</strong> ${n1.toFixed(2)}</p>
            <p><strong>Nota 2:</strong> ${n2.toFixed(2)}</p>
            <p><strong>Média:</strong> ${media.toFixed(2)}</p>
            <p><strong>Situação:</strong> <strong>${situacao}</strong></p>
            <br>
            <a href="/">Voltar ao Formulário</a>
  `);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});