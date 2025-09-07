import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estados separados para mensagens de sucesso e erro
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpa mensagens anteriores a cada tentativa
    setErrorMsg('');
    setSuccessMsg('');

    // --- INÍCIO DA VALIDAÇÃO NO FRONT-END ---
    if (senha.length < 8) {
      setErrorMsg('A senha deve ter no mínimo 8 caracteres.');
      return; // Impede o envio do formulário se a senha for inválida
    }
    // --- FIM DA VALIDAÇÃO ---

    try {
      const resposta = await fetch('http://localhost:5000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setSuccessMsg('Cadastro realizado com sucesso!');
        // Limpa os campos do formulário
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        setErrorMsg(dados.erro || 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (error) {
      setErrorMsg('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
  };

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title className="mb-4 text-center">Cadastro</Card.Title>
        
        {/* Mostra alerta de sucesso ou erro */}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </Form.Group>

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
              placeholder="Mínimo 8 caracteres"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              minLength="8" // Ajuda o navegador a validar também
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Cadastrar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Cadastro;