import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      setMensagem('Login realizado com sucesso!');
      setEmail('');
      setSenha('');
    } else {
      setMensagem(dados.erro || 'Erro ao fazer login.');
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title className="mb-4 text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Entrar
          </Button>
        </Form>
        {mensagem && <Alert className="mt-3" variant="info">{mensagem}</Alert>}
      </Card.Body>
    </Card>
  );
}

export default Login;