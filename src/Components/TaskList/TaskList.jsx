import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getTasks, createTask, toggleTaskStatus, deleteTask } from '../../services/taskService'

const TaskList = () => {
    const { workspace_id } = useParams()
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const [newTasks, setNewTasks] = useState({});

    const { 
        response: tasksResponse, 
        loading: tasksLoading, 
        error: tasksError, 
        sendRequest: fetchTasks 
    } = useFetch()

    const { sendRequest: sendCreateTask } = useFetch()

    useEffect(() => {
        if(workspace_id) {
            fetchTasks(() => getTasks(workspace_id))
        }
    }, [workspace_id])

    // Manejar el input de texto de cada día por separado
    const handleInputChange = (day, value) => {
        setNewTasks(prev => ({ ...prev, [day]: value }));
    }

    // Crear tarea específica para un día
    const handleCreateTask = async (e, day) => {
        e.preventDefault()
        const title = newTasks[day];
        if(!title) return;

        await sendCreateTask(async () => {
            await createTask(workspace_id, title, day) // <--- Enviamos el día correcto al backend
            setNewTasks(prev => ({ ...prev, [day]: '' })); // Limpiamos el input de ese día
            fetchTasks(() => getTasks(workspace_id)) // Recargamos lista
        })
    }

    const handleDelete = async (task_id) => {
        if(confirm('¿Borrar tarea?')) {
            await deleteTask(workspace_id, task_id)
            fetchTasks(() => getTasks(workspace_id))
        }
    }

    const handleToggle = async (task_id, status) => {
        await toggleTaskStatus(workspace_id, task_id, status)
        fetchTasks(() => getTasks(workspace_id))
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{color: 'white'}}>Weekly Planner</h2>

            {tasksLoading && <p style={{color: 'white'}}>Cargando planner...</p>}
            {tasksError && <p style={{color: 'red'}}>{tasksError}</p>}
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px' 
            }}>
                {daysOfWeek.map(day => (
                    <div key={day} style={{ 
                        border: '1px solid #444', 
                        borderRadius: '10px', 
                        padding: '15px', 
                        background: '#1a1a1a',
                        color: 'white',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h3 style={{ borderBottom: '1px solid #666', paddingBottom: '10px', marginTop: 0 }}>
                            {day}
                        </h3>

                        <div style={{ flex: 1, marginBottom: '10px' }}>
                            {tasksResponse && tasksResponse.data.tasks
                                .filter(task => task.day_of_week === day)
                                .map(task => (
                                    <div key={task._id} style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                        padding: '5px',
                                        background: '#333',
                                        borderRadius: '5px'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <input 
                                                type="checkbox" 
                                                checked={task.status === 'completed'} 
                                                onChange={() => handleToggle(task._id, task.status)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <span style={{ 
                                                textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                                opacity: task.status === 'completed' ? 0.5 : 1
                                            }}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(task._id)}
                                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))
                            }
                        </div>

                        <form onSubmit={(e) => handleCreateTask(e, day)} style={{ display: 'flex', gap: '5px' }}>
                            <input 
                                type="text" 
                                value={newTasks[day] || ''}
                                onChange={(e) => handleInputChange(day, e.target.value)}
                                placeholder="Nueva tarea..."
                                style={{ 
                                    flex: 1, 
                                    padding: '5px', 
                                    borderRadius: '5px', 
                                    border: '1px solid #555',
                                    background: '#222',
                                    color: 'white'
                                }}
                            />
                            <button type="submit" style={{ cursor: 'pointer' }}>+</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskList