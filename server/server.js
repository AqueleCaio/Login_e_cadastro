const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const fs = require('fs');

const app = express();
const PORT = 3500;

app.use(express.json());

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    // Caminho para o banco de dados JSON
    const dbPath = path.join(__dirname, 'server/database/user.json');
    const users = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // Verifica se o usuário existe
    const user = users.find((u) => u.email === email && u.senha === senha);

    if (!user) {
        return res.status(401).json({ error: 'Email ou senha incorretos.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!' });
});

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
