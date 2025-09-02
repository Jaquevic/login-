const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Rotas
app.get('/teste', (req, res) => {
  res.json({ mensagem: 'Conexão funcionando!' });
});

let usuarios = [];

app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
  }
  const usuarioExistente = usuarios.find(u => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ erro: 'Email já cadastrado!' });
  }
  const novoUsuario = { nome, email, senha };
  usuarios.push(novoUsuario);
  return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios!' });
  }
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ erro: 'Credenciais inválidas!' });
  }
  return res.json({ mensagem: 'Login realizado com sucesso!', usuario });
});

app.get('/usuarios', (req, res) => {
  return res.json(usuarios);
});

// Configuração do CORS específica (opcional)
app.use(({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

// Iniciando servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
