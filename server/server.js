const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');

const app = express();
const PORT = 3500;

app.use(express.json());

//middleware para interpretar JSON no corpo da requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));


// Middleware para interpretar JSON no corpo da requisição
app.use(bodyParser.json());

// Rotas
app.use('/api', userRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para a página de cadastro
app.get('/cadastro.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cadastro.html'));
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
