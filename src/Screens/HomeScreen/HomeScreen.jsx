import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getWorkspaces, createWorkspace } from '../../services/workspaceService'
import UserMenu from '../../Components/UserMenu/UserMenu'
import './HomeScreen.css'

const HomeScreen = () => {
    const { sendRequest, response, loading, error } = useFetch()
    const { sendRequest: sendCreateRequest, loading: creating } = useFetch()
    const [workspaceName, setWorkspaceName] = useState('')

    const loadWorkspaces = () => {
        sendRequest(getWorkspaces)
    }

    useEffect(() => {
        loadWorkspaces()
    }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!workspaceName) return

        await sendCreateRequest(async () => {
            await createWorkspace(workspaceName)
            setWorkspaceName('')
            loadWorkspaces()
        })
    }

    return (
        <div className="main-layout">
            <header className="top-header">
                <h1 className="app-title">Bienvenido de vuelta!</h1>
                <UserMenu />
            </header>

            <div className="content-container">

                <div className="creation-section">
                    <h2 className="section-title">Crea un nuevo espacio de tareas</h2>
                    <form onSubmit={handleCreate} className="create-form">
                        <input
                            type="text"
                            placeholder="Ej: School, Home, Art..."
                            value={workspaceName}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            className="glass-input"
                        />
                        <button type="submit" disabled={creating} className="pastel-button">
                            {creating ? '...' : 'Create'}
                        </button>
                    </form>
                </div>

                {loading && <p className="loading-text">Cargando espacios de tareas...</p>}
                {error && <p className="error-text">{error}</p>}

                <div className="grid-workspaces">
                    {response && response.data.workspaces.length === 0 && (
                        <div className="empty-state">Aun no tienes tareas. Crea una!</div>
                    )}

                    {response && response.data.workspaces.map((workspace) => {
                        const idReal = workspace.workspace_id || workspace._id;
                        return (
                            <div key={idReal} className="workspace-card">
                                <div className="card-top"></div>
                                <div className="card-body">
                                    <h3>{workspace.workspace_name || workspace.name}</h3>
                                    <Link to={'/workspace/' + idReal} className="enter-link">
                                        Abrir espacio ➜
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeScreen