import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Estados separados para mensagens de sucesso e erro
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpa mensagens anteriores
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const resposta = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setSuccessMsg('Login realizado com sucesso!');
        setEmail('');
        setSenha('');
      } else {
        setErrorMsg(dados.erro || 'Erro ao fazer login.');
      }
    } catch (error) {
      setErrorMsg('Não foi possível conectar ao servidor.');
    }
  };

  return (
    // Adicionamos a classe 'custom-card' para aplicar nossos novos estilos
    <Card className="mx-auto mt-5 custom-card" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title className="mb-4 text-center h2">Login</Card.Title>

        {/* Mostra alerta de sucesso ou erro com as cores certas */}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

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
      </Card.Body>
    </Card>
  );
}

export default Login;