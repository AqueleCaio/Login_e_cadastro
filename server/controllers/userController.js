const fs = require('fs');
const path = require('path');

// Caminho para o arquivo JSON
const usersFilePath = path.join(__dirname, '../database/users.json');

// Função para ler o arquivo JSON
const readUsersFromFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

// Função para salvar usuários no arquivo JSON
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Função para validar inputs; nome, email e senha e salva no arquivo JSON
const registerUser = (req, res) => {
    const { nome, email, senha } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    // Ler os usuários existentes
    const users = readUsersFromFile();

    // Verificar se o e-mail já está registrado
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'E-mail já registrado!' });
    }

    // Adicionar o novo usuário
    const newUser = { nome, email, senha };
    users.push(newUser);

    // Salvar no arquivo JSON
    writeUsersToFile(users);

    // Printa os dados do usuário cadastrado no console
    console.log('Usuário cadastrado:', newUser);

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

// Função para logar usuários
const loginUser = (req, res) => {
    const { email, password } = req.body;

    // Verifica se o arquivo de usuários existe
    if (!fs.existsSync(usersFilePath)) {
        return res.status(404).json({ error: 'Nenhum usuário encontrado.' });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath));

    // Verifica se o email e a senha correspondem a um usuário
    const user = users.find(user => user.email === email && user.senha === password);

    if (!user) {
        return res.status(401).json({ error: 'Email ou senha incorretos.' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido!' });
};


module.exports = {
    registerUser,
    loginUser,
};
