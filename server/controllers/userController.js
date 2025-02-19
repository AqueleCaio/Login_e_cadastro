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
// Função para registrar um novo usuário e validar os inputs: nome, email e senha
const registerUser = (req, res) => {
    const { nome, email, senha } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    // Validação do tamanho da senha
    if(senha.length < 8){
        return res.status(400).json({ error: 'Senha deve conter no mínimo 8 caracteres!' });
    } 

    // Validação do e-mail
    const validDomains = ['gmail', 'hotmail', 'yahoo', 'outlook'];
    const emailParts = email.split('@');

    if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
        return res.status(400).json({ error: 'E-mail inválido!' });
    }

    const domain = emailParts[1].split('.')[0]; // Parte entre o @ e o primeiro .
    if (!validDomains.includes(domain)) {
        return res.status(400).json({ error: `E-mail inválido!` });
    }

    // Validação do nome
    const nomeRegex = /^[a-zA-Z0-9]+\s[a-zA-Z0-9]+$/;
    if (!nomeRegex.test(nome)) {
        return res.status(400).json({ error: 'Deve conter sobrenome sem caracteres especiais.' });
    }

    // Ler os usuários existentes
    const users = readUsersFromFile();

    // Verificar se o e-mail já está registrado
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({ error: 'Este e-mail já está registrado!' });
    }

    // Verificar se o nome já está registrado
    const existingUserName = users.find(user => user.nome.toLowerCase() === nome.toLowerCase());
    if (existingUserName) {
        return res.status(409).json({ error: 'Este nome já está registrado!' });
    }

    // Adicionar o novo usuário
    const newUser = { nome, email, senha };
    users.push(newUser);

    // Salvar no arquivo JSON
    writeUsersToFile(users);

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

// Função para fazer login de usuários e validar os inputs: email e senha
const loginUser = (req, res) => {
    try {
        const { email, senha } = req.body;

        // Validação de campos obrigatórios
        if (!email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
        }

        // Validação do tamanho da senha
        if(senha.length < 8){
            return res.status(400).json({ error: 'Senha deve conter no mínimo 8 caracteres!' });
        } 

        // Validação do email
        const validDomains = ['gmail', 'hotmail', 'yahoo', 'outlook'];
        const emailParts = email.split('@');

        if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
            return res.status(400).json({ error: 'E-mail inválido!' });
        }

        const domain = emailParts[1].split('.')[0];
        if (!validDomains.includes(domain)) {
            return res.status(400).json({ error: `E-mail inválido!` });
        }

        // Verifica se o arquivo de usuários existe
        if (!fs.existsSync(usersFilePath)) {
            return res.status(404).json({ error: 'Nenhum usuário encontrado.' });
        }

        const usersData = fs.readFileSync(usersFilePath, 'utf-8');
        const users = JSON.parse(usersData);

        // Verificar se existe o email
        const userByEmail = users.find(user => user.email === email);

        // Verificar se existe a senha
        const userBySenha = users.find(user => user.senha === senha);

        if (userByEmail && userBySenha) {
            // Verifica se o email e senha correspondem ao mesmo usuário
            const user = users.find(user => user.email === email && user.senha === senha);
            if (user) {
                return res.status(200).json({ message: 'Login bem-sucedido!' });
            }
        }

        // Mensagens de erro específicas
        if (userByEmail && !userBySenha) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        if (!userByEmail && userBySenha) {
            return res.status(401).json({ error: 'Email incorreto.' });
        }

        return res.status(401).json({ error: 'Email ou senha incorretos.' });

    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).json({ error: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};

module.exports = {
    registerUser,
    loginUser
};