import React, { useEffect, useState } from 'react' // Importamos useState
import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getWorkspaces, createWorkspace } from '../../services/workspaceService' // Importamos la nueva función

const HomeScreen = () => {
  const { sendRequest, response, loading, error } = useFetch()
  
  // Hook extra para la creación
  const { sendRequest: sendCreateRequest, loading: creating } = useFetch()
  
  // Estado para el input del nombre
  const [workspaceName, setWorkspaceName] = useState('')

  // Función para cargar la lista
  const loadWorkspaces = () => {
      sendRequest(getWorkspaces)
  }

  useEffect(() => {
    loadWorkspaces()
  }, [])

  // Manejador del formulario de crear
  const handleCreate = async (e) => {
      e.preventDefault()
      if(!workspaceName) return

      await sendCreateRequest(async () => {
          await createWorkspace(workspaceName)
          setWorkspaceName('') // Limpiar input
          loadWorkspaces() // Recargar la lista automáticamente
      })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mis Espacios de Trabajo</h1>
      
      {/* --- FORMULARIO DE CREACIÓN NUEVO --- */}
      <form onSubmit={handleCreate} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px' }}>
          <h3>Crear nuevo espacio</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                  type="text" 
                  placeholder="Ej: Trabajo, Casa, Estudios..." 
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  style={{ flex: 1, padding: '8px' }}
              />
              <button type="submit" disabled={creating} style={{ padding: '8px 15px', cursor: 'pointer' }}>
                  {creating ? 'Creando...' : 'Crear'}
              </button>
          </div>
      </form>
      {/* ----------------------------------- */}

      {loading && <p>Cargando workspaces...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {response && response.data.workspaces.length === 0 && (
            <p>No tienes espacios de trabajo aún. ¡Crea uno arriba!</p>
        )}

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
                <h2 style={{marginTop: 0}}>{workspace.workspace_name || workspace.name}</h2>
                <Link to={'/workspace/' + idReal} style={{ 
                    color: 'white', 
                    background: '#007bff', 
                    padding: '10px', 
                    textDecoration: 'none', 
                    borderRadius: '5px',
                    display: 'inline-block',
                    marginTop: '10px'
                }}>
                    Entrar
                </Link>
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default HomeScreen