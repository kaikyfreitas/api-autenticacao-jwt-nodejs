const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('./src/middleware/authenticateToken');

const app = express();
app.use(express.json());

const usersDBPath = path.join(__dirname, 'users.json');

// Função auxiliar para ler usuários
const readUsers = () => JSON.parse(fs.readFileSync(usersDBPath));
// Função auxiliar para salvar usuários
const writeUsers = (data) => fs.writeFileSync(usersDBPath, JSON.stringify(data, null, 2));

// --- ROTA DE REGISTRO ---
app.post('/register', async (req, res) => {
    try {
        const users = readUsers();
        const { username, password } = req.body;

        // Verifica se o usuário já existe
        if (users.find(user => user.username === username)) {
            return res.status(400).send('Usuário já existe.');
        }

        // Faz o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salva o novo usuário
        const newUser = { id: Date.now(), username, password: hashedPassword };
        users.push(newUser);
        writeUsers(users);

        res.status(201).send('Usuário registrado com sucesso.');
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
});

// --- ROTA DE LOGIN ---
app.post('/login', async (req, res) => {
    try {
        const users = readUsers();
        const { username, password } = req.body;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).send('Usuário não encontrado.');
        }

        // Compara a senha enviada com o hash salvo
        if (await bcrypt.compare(password, user.password)) {
            // Senha correta, gera o token JWT
            const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ accessToken: accessToken });
        } else {
            res.status(401).send('Senha incorreta.');
        }
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
});

// --- ROTA PROTEGIDA ---
// Apenas usuários com um token válido podem acessar esta rota
app.get('/profile', authenticateToken, (req, res) => {
    // O middleware 'authenticateToken' já validou o token
    // e adicionou os dados do usuário em 'req.user'
    res.json({ message: `Bem-vindo, ${req.user.username}!`, userData: req.user });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor de autenticação rodando em http://localhost:${PORT}`);
});