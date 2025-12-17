import React from 'react'
import { Link } from 'react-router'
import TaskList from '../../Components/TaskList/TaskList'
import './WorkspaceScreen.css'

const WorkspaceScreen = () => {
  return (
    <div className="workspace-layout">
        <aside className="sidebar-container">
            <h3 className="sidebar-title">Your List</h3>
            <Link to="/home" className="back-link">
                ⬅ Volver al menu
            </Link>
        </aside>

        <main className="workspace-main">
            <TaskList />
        </main>
    </div>
  )
}

export default WorkspaceScreen