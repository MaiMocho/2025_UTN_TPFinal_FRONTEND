
import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getWorkspaces } from '../../services/workspaceService'

const HomeScreen = () => {
  const { sendRequest, response, loading, error } = useFetch()

  useEffect(() => {
    sendRequest(getWorkspaces)
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de espacios de trabajo</h1>
      
      {loading && <p>Cargando workspaces...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {response && response.data.workspaces.map((workspace) => {
            
            const idReal = workspace.workspace_id || workspace._id; 
            
            return (
              <div key={idReal} style={{ 
                  border: '1px solid #ccc', 
                  padding: '20px', 
                  borderRadius: '8px',
                  minWidth: '200px',
                  background: '#fff',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <h2>{workspace.workspace_name || workspace.name}</h2>
                <Link to={'/workspace/' + idReal} style={{ 
                    color: 'white', 
                    background: '#007bff', 
                    padding: '10px', 
                    textDecoration: 'none', 
                    borderRadius: '5px',
                    display: 'inline-block',
                    marginTop: '10px'
                }}>
                    Abrir workspace
                </Link>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default HomeScreen
/*import React from 'react'
import { Link } from 'react-router'
import TaskList from '../../Components/TaskList/TaskList'

const WorkspaceScreen = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
        <aside style={{ width: '200px', background: '#f0f0f0', padding: '20px' }}>
            <h3>Menú</h3>
            <Link to="/home">⬅ Volver al Inicio</Link>
        </aside>

        <main style={{ flex: 1, padding: '20px' }}>
            <TaskList />
        </main>
    </div>
  )
}

export default WorkspaceScreen*/