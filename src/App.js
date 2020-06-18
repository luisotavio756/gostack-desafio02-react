import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    loadRepositories();
  }, []);

  async function loadRepositories() {
    try {
      const { data } = await api.get('/repositories');

      setRepositories(data);
    } catch (error) {
      alert('Não foi possível buscar os repositórios !');
    }
  }

  async function handleAddRepository() {
    const data = {
      title: "Repositório" + new Date(),
      url: 'https://github.com/luisotavio756/gostack-desafio02.git',
      techs: [
        'ReactJS',
        'Node.js'
      ]
    }

    try {
      const response = await api.post('/repositories', data);

      setRepositories([
        ...repositories,
        response.data
      ]);

    } catch (error) {
      alert('Não foi possível adicionar o repositório !');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`/repositories/${id}`);

      const updatedRepositories = repositories.filter(rep => rep.id !== id);

      setRepositories(updatedRepositories);
    } catch (error) {
      alert('Não foi possível excluir o repositório !');
    }
  }

  return (
    <div id="container">
      <div className="input-blocks">
        <input 
          name="title" 
          type="text"
          placeholder="Ex: desafio01-gostack"
        />
        <input 
          name="url" 
          type="text"
          placeholder="Ex: https://github.com/luisotavio756/gostack-desafio02.git"
        />
        <input 
          name="techs" 
          type="text"
          placeholder="Ex: ReactJS, Node.js"
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      <div className="list">
        <ul data-testid="repository-list">
          {
            repositories.length > 0 ?
            repositories.map(repositorie => (
              <li key={repositorie.id}>
                { repositorie.title }

                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
                </button>
              </li>
            )) : null
          }
        </ul>
      </div>
      <p style={{ marginTop: 10 }}>Made with ❤ por Luis Otávio</p>
    </div>
  );
}

export default App;
