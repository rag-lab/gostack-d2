import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  //useState 2 param, 1- valor inicial da var, 2 funcao para atualizar o valor.
  const [projects, setProjects] = useState([]);


  useEffect(()=>{
    api.get('repositories').then( response =>{
      setProjects(response.data)
    })
  }, [])


  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories',
      {
        "title":`New Proj ${Date.now()}`,
        "url":"http://banana.com",
        "techs":["banana","nanica","da terra"]
      }
    )
    const project = response.data;

    setProjects([...projects, project])
  }

  async function handleRemoveRepository(id) {

    // TODO
    await api.delete(`repositories/${id}`)

    const newProjects = projects.filter(
      project => project.id !== id
    )

    setProjects(newProjects)

    //api.get('repositories').then( response =>{
    // setProjects(response.data)      
    //})
  }


  return (
    <div>
      <ul data-testid="repository-list">

        {projects.map(project => 
          <li key={project.id}>{project.title}
          <button type="button" onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
          </li>
          )
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
