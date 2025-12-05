import React from 'react'
import { Link } from 'react-router'
// Asegúrate de que la ruta de importación sea correcta
import TaskList from '../../Components/TaskList/TaskList' 

const WorkspaceScreen = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
        <aside style={{ width: '200px', background: '#f0f0f0', padding: '20px' }}>
            <h3>Menú</h3>
            <Link to="/home">⬅ Volver al Inicio</Link>
        </aside>

        <main style={{ flex: 1, padding: '20px', background: '#111' }}>
            <TaskList />
        </main>
    </div>
  )
}

export default WorkspaceScreen