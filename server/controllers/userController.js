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

// Função para registrar um novo usuário e validar os inputs; nome, email e senha
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

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

// Função para validar inputs; email e senha e autentica o usuário
const loginUser = (req, res) => {
    try {
        const { email, senha } = req.body; 

        // Verifica se o arquivo de usuários existe
        if (!fs.existsSync(usersFilePath)) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado.' });
        }

        const usersData = fs.readFileSync(usersFilePath, 'utf-8');
        const users = JSON.parse(usersData);

        // Verifica se o email e a senha correspondem a um usuário
        const user = users.find(user => user.email === email && user.senha === senha);

        if (!user) {
            console.warn('Usuário não encontrado ou senha incorreta.');
            return res.status(401).json({ error: 'Email ou senha incorretos.' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido!' });

    } catch (error) {
        return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
