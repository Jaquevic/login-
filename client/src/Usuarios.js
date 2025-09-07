import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const resposta = await fetch('http://localhost:5000/usuarios');
        if (!resposta.ok) {
          throw new Error('Falha ao buscar dados dos usuários.');
        }
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (err) {
        setError(err.message || 'Não foi possível conectar ao servidor.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: 600 }}>
      <Card.Header as="h4" className="text-center">Usuários Cadastrados</Card.Header>
      <Card.Body>
        {usuarios.length > 0 ? (
          <ListGroup variant="flush">
            {usuarios.map(usuario => (
              <ListGroup.Item key={usuario.id || usuario.email}>
                <strong>Nome:</strong> {usuario.nome} <br />
                <strong>Email:</strong> {usuario.email}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p className="text-center">Nenhum usuário cadastrado ainda.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default Usuarios;