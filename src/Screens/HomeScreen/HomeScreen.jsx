import React from 'react'
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

export default WorkspaceScreen