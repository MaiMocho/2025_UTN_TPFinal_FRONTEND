import ENVIRONMENT from "../config/environment";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext";

async function getChannelList (workspace_id){
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            },
        }
    );
   
    const response = await response_http.json();
    console.log(response.ok)
     if (!response.ok) {
        throw new Error("Error at get channels");
    }
    return response;
}
async function createChannel (workspace_id, channel_name){

}

export { getChannelList, createChannel }