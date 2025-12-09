import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getTasks, createTask, toggleTaskStatus, deleteTask } from '../../services/taskService'
import './TaskList.css'

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

    const handleInputChange = (day, value) => {
        setNewTasks(prev => ({ ...prev, [day]: value }));
    }

    const handleCreateTask = async (e, day) => {
        e.preventDefault()
        const title = newTasks[day];
        if(!title) return;

        setNewTasks(prev => ({ ...prev, [day]: '' })); 

        await sendCreateTask(async () => {
            await createTask(workspace_id, title, day)
            fetchTasks(() => getTasks(workspace_id))
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
        <div className="planner-container">
            <h2 className="planner-title">Weekly Planner</h2>

            {tasksError && <p className="error-message">{tasksError}</p>}
            
            {/* Usamos una clase condicional para la opacidad */}
            <div className={`weekly-grid ${tasksLoading ? 'loading' : ''}`}>
                
                {daysOfWeek.map(day => (
                    <div key={day} className="day-card">
                        <h3 className="day-header">{day}</h3>

                        <div className="task-items-container">
                            {tasksResponse && tasksResponse.data.tasks
                                .filter(task => task.day_of_week === day)
                                .map(task => (
                                    <div key={task._id} className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
                                        
                                        <div className="task-content">
                                            <input 
                                                type="checkbox" 
                                                className="task-checkbox"
                                                checked={task.status === 'completed'} 
                                                onChange={() => handleToggle(task._id, task.status)}
                                            />
                                            <span className={`task-text ${task.status === 'completed' ? 'completed' : ''}`}>
                                                {task.title}
                                            </span>
                                        </div>

                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(task._id)}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))
                            }
                        </div>

                        <form onSubmit={(e) => handleCreateTask(e, day)} className="add-task-form">
                            <input 
                                type="text" 
                                className="add-task-input"
                                value={newTasks[day] || ''}
                                onChange={(e) => handleInputChange(day, e.target.value)}
                                placeholder="Nueva tarea..."
                            />
                            <button type="submit" className="add-task-btn">+</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TaskList