import ENVIRONMENT from "../config/environment";

export async function getWorkspaces () {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        throw new Error('Error al obtener lista de workspaces')
    }
    const response = await response_http.json()
    return response
}
export async function createWorkspace(name) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({ name })
        }
    )
    if(!response_http.ok){
        throw new Error('Error al crear workspace')
    }
    return await response_http.json()
}