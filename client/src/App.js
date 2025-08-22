import { useEffect, useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/teste')
      .then(res => res.json())
      .then(data => setMensagem(data.mensagem));
  }, []);

  return <h1>{mensagem}</h1>;
}

export default App;
