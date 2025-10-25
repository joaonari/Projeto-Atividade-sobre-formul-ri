// Importa o framework Express
const express = require("express");
// Importa o body-parser para tratar dados de formulários POST
const bodyParser = require("body-parser");
const path = require('path')

const app = express();
const port = 3000;

// Configura o body-parser para ler dados do corpo da requisição
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (como o HTML dos formulários)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para o formulário
app.get("/", (req, res) => {
  // Você pode criar um arquivo HTML específico para o formulário de média
  res.sendFile(path.join(__dirname, 'public', 'form-media.html'));
});

// Rota para tratar o formulário POST e calcular a média
app.post("/processar-media", (req, res) => {
  // Recebe os dados do formulário via req.body (requisição POST)
  const { nome, nota1, nota2 } = req.body;

  // Converte as notas para números para realizar o cálculo
  const n1 = parseFloat(nota1);
  const n2 = parseFloat(nota2);

  // Validação básica para garantir que as notas são números
  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).send("<h2>Erro: Notas inválidas. Certifique-se de que nota1 e nota2 são números.</h2>");
  }

  // 1. Calcular a Média
  const media = (n1 + n2) / 2;
  let situacao = "";

  // 2. Definir a Situação
  /* Regra de negócio:
     Aprovado: média >= 6
     Exame Final: média >=2 e média < 6
     Reprovado: média < 2
  */
  if (media >= 6) {
    situacao = "Aprovado";
  } else if (media >= 2 && media < 6) {
    situacao = "Exame Final";
  } else { // media < 2
    situacao = "Reprovado";
  }

  // 3. Exibir o Resultado
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