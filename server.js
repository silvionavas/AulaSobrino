const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('banco_de_dados.db');

// Criar tabela de usuários se não existir
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT UNIQUE, senha TEXT)");
});

// Middleware para processar dados JSON
app.use(express.json());

// Rota para registro (sign up)
app.post('/signup', (req, res) => {
    const { nome, email, senha } = req.body;

    // Inserir usuário na tabela
    const stmt = db.prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    stmt.run(nome, email, senha, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao registrar usuário' });
        } else {
            res.status(200).json({ message: 'Usuário registrado com sucesso' });
        }
    });
});

// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Consultar usuário no banco de dados
    db.get("SELECT * FROM usuarios WHERE email = ? AND senha = ?", [email, senha], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao fazer login' });
        } else if (row) {
            res.status(200).json({ message: 'Login bem-sucedido', usuario: row });
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    });
});


// Rota para obter dados dos usuários
app.get('/usuarios', (req, res) => {
    // Consultar todos os usuários no banco de dados
    db.all("SELECT * FROM usuarios", (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar dados dos usuários' });
        } else {
            res.status(200).json(rows);
        }
    });
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//Verifica se os dados 
app.post('/signup', (req, res) => {
    console.log(req.body); // Verifica se os dados estão chegando corretamente
    // Restante do código para inserir no banco de dados
});


