import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cadastro from './cadastro';
import Login from './login';
import Usuarios from './Usuarios'; // Importa o novo componente
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Aplicação de Cadastro</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/cadastro">Cadastro</Nav.Link>
            <Nav.Link as={Link} to="/usuarios">Usuários</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-5">
              <h1>Bem-vindo à Aplicação de Cadastro</h1>
              <p>Utilize o menu acima para acessar o Login ou Cadastro.</p>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/usuarios" element={<Usuarios />} /> 
        </Routes>
      </Container>
    </Router>
  );
}

export default App;