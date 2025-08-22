const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  app.get('/teste', (req, res) => {
  res.json({ mensagem: 'Conexão funcionando!' });
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));


});
