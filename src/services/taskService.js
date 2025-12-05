import ENVIRONMENT from "../config/environment";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext";

export async function getTasks(workspace_id) {
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/tasks`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    );

    const response = await response_http.json();
    if (!response.ok) {
        throw new Error(response.message || 'Error al obtener tareas');
    }
    return response; 
}

export async function createTask(workspace_id, title, day_of_week) {
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            },
            body: JSON.stringify({ title, day_of_week })
        }
    );

    const response = await response_http.json();
    if (!response.ok) {
        throw new Error(response.message || 'Error al crear tarea');
    }
    return response;
}

export async function toggleTaskStatus(workspace_id, task_id, current_status) {
    const new_status = current_status === 'pending' ? 'completed' : 'pending';
    
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/tasks/${task_id}/status`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            },
            body: JSON.stringify({ status: new_status })
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error('Error al actualizar tarea');
    }
    return response;
}

export async function deleteTask(workspace_id, task_id) {
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/tasks/${task_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    );
    const response = await response_http.json();
    if (!response.ok) {
        throw new Error('Error al eliminar tarea');
    }
    return response;
}